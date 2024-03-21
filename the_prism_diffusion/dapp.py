from os import environ
import logging
import requests
from PIL import Image
import torch
import json
from diffusers import StableDiffusionImg2ImgPipeline

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")


def str2hex(string):
    return binary2hex(str2binary(string))

def str2binary(string):
    return string.encode("utf-8")

def binary2hex(binary):
    return "0x" + binary.hex()

def hex2binary(hexstr):
    return bytes.fromhex(hexstr[2:])

def hex2str(hexstr):
    return hex2binary(hexstr).decode("utf-8")

def run_stable_diffusion(prompt):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32

    pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=dtype
    ).to(device)
    
    logger.info(f"Running stable diffusion with prompt {prompt}")

    base_image_path = "tshirtbase.png"
    init_image = Image.open(base_image_path)
    prompt = prompt + "It must maintain the original colors, texture, and shape of the fabric"
    negative_prompt = "A plain t-shirt without any designs"
    prompt_to_print = prompt.replace(" ", "_")
    num_of_samples = 1
    result = pipe(prompt=[prompt] * num_of_samples, image=init_image, negative_prompt=[negative_prompt] * num_of_samples, strength=0.75, guidance_scale=7.5)

    images = result["images"]
    for i, image in enumerate(images):       
        prompt_to_print = str(i) + "-" + prompt
        output_file = prompt_to_print.replace(" ", "_") + "-Img2Img" + ".jpg"
        image.save(output_file)
        print("Saved: " + str(output_file))


def handle_advance(data):
    
    binary = hex2str(data['payload'])
    json_data = json.loads(binary)
    
    if json_data["method"] == "generate_design":
        run_stable_diffusion(json_data["prompt"])
        logger.info(f"Received FUNCIONOU request data {data}")
    
    return "accept"


def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    return "accept"


handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])
