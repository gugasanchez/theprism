from os import environ
import logging
import requests
import json
import traceback
import base64
from eth_abi.abi import encode
from eth_abi_ext import decode_packed


logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")

TRANSFER_FUNCTION_SELECTOR = b'\xa9\x05\x9c\xbb'
SAFE_TRANSFER_FUNCTION_SELECTOR = b'\x42\x84\x2e\x0e'
ERC20_PORTAL_ADDRESS = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB"
ERC721_PORTAL_ADDRESS = "0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87"
DAPP_RELAY_ADDRESS = "0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE"

rollup_address = None

user_id = 0
design_id = 0
order_id = 0

users = {}
designs = {}
orders = {}

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

def send_notice(notice: str) -> None:
    send_post("notice", notice)

def send_report(report: str) -> None:
    send_post("report", report)
    
def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        return encoded_string.decode('utf-8')

def send_post(endpoint, json_data) -> None:
    response = requests.post(rollup_server + f"/{endpoint}", json=json_data)
    logger.info(
        f"/{endpoint}: Received response status {response.status_code} body {response.content}")
    
    
def add_user(name, email):
    global user_id
    user_id += 1
    user = {
        "id": user_id,
        "name": name,
        "email": email,
        "status": "active"
    }
    users[user_id] = user
    return user
    
    
def generate_design(prompt):
    global design_id
    design_id += 1
    design = {
        "id": design_id,
        "prompt": prompt,
        "image": encode_image_to_base64(f"design_{design_id}.png")
    }
    designs[design_id] = design
    return design

def generate_order(user_id, design_id):
    global order_id
    order_id += 1
    order = {
        "id": order_id,
        "user_id": user_id,
        "design_id": design_id,
        "status": "pending"
    }
    orders[order_id] = order
    return order

def transfer_design_to_other_user(user_id, design_id, other_user_id):
    design = designs[design_id]
    design["user_id"] = other_user_id
    return design

def list_users():
    return list(users.values())

def list_designs():
    return list(designs.values())

def list_orders():
    return list(orders.values())

def get_user(user_id):
    return users[user_id]

def get_design(design_id):
    return designs[design_id]

def get_order(order_id):
    return orders[order_id]

def update_order_status(order_id, status):
    order = orders[order_id]
    order["status"] = status
    return order

def list_designs_by_user(user_id):
    return [design for design in designs.values() if design["user_id"] == user_id]

def list_orders_by_user(user_id):
    return [order for order in orders.values() if order["user_id"] == user_id]

def list_orders_by_design(design_id):
    return [order for order in orders.values() if order["design_id"] == design_id]

def handle_erc20_deposit(data):
    binary = bytes.fromhex(data["payload"][2:])
    try:
        decoded = decode_packed(['bool','address','address','uint256'], binary)
    except Exception as e:
        # payload does not conform to ERC20 deposit ABI
        return "reject"

    # success = decoded[0]
    erc20 = decoded[1]
    depositor = decoded[2]
    amount = decoded[3]
    # Post notice about the deposit
    notice_str = f"Deposit received from: {depositor}; ERC-20: {erc20}; Amount: {amount}"
    logger.info(f"Adding notice: {notice_str}")
    notice = {"payload": str2hex(notice_str)}
    send_notice(notice)
    
def handle_erc721_deposit(data):
    binary = bytes.fromhex(data["payload"][2:])
    try:
        decoded = decode_packed(['address', 'address', 'uint256'], binary)
    except Exception as e:
        # payload does not conform to ERC721 deposit ABI
        return "reject"

    erc721 = decoded[0]
    depositor = decoded[1]
    token_id = decoded[2]
    #Post notice about the deposit
    notice_str = f"Deposit received from: {depositor}; ERC-721: {erc721}; Token ID: {token_id}"
    logger.info(f"Adding notice: {notice_str}")
    notice = {"payload": str2hex(notice_str)}
    send_notice(notice)

def erc20_transfer_voucher(token_address,receiver,amount):
    transfer_payload = TRANSFER_FUNCTION_SELECTOR + encode(['address','uint256'], [receiver, amount])
    voucher = {"destination": token_address, "payload": "0x" + transfer_payload.hex()}
    send_post("voucher", voucher)


def erc721_safetransfer_voucher(token_address,receiver,id):
    transfer_payload = SAFE_TRANSFER_FUNCTION_SELECTOR + encode(['address','address','uint256'], [rollup_address, receiver, id])
    voucher = {"destination": token_address, "payload": "0x" + transfer_payload.hex()}
    send_post("voucher", voucher)
    

def handle_advance(data):

    logger.info(f"Receiving advance request with data {hex2str(data['payload'])} from {data['metadata']['msg_sender']}")
    
    binary = hex2str(data['payload'])
    json_data = json.loads(binary)    
    
    try:
        
        msg_sender = data["metadata"]["msg_sender"]
        
        if msg_sender.lower() == DAPP_RELAY_ADDRESS.lower():
            rollup_address = data['payload']
            send_report({"payload": str2hex(f"Set rollup_address {rollup_address}")})
        
        elif msg_sender.lower() == ERC20_PORTAL_ADDRESS.lower():
            handle_erc20_deposit(data)
        
        elif msg_sender.lower() == ERC721_PORTAL_ADDRESS.lower():
            handle_erc721_deposit(data)
        
        elif json_data["method"] == "transfer_erc721":
            erc721_safetransfer_voucher(json_data["token_address"], json_data["receiver"], json_data["id"])
        
        elif json_data["method"] == "transfer_erc20":
            erc20_transfer_voucher(json_data["token_address"], json_data["receiver"], json_data["amount"])
        
        elif json_data["method"] == "add_user":
            user = add_user(json_data["name"], json_data["email"])
            report_payload = {"user_id": user["id"]}
            send_report({"payload": str2hex(f'{report_payload}')})
            
        elif json_data["method"] == "generate_design":
            design = generate_design(json_data["prompt"])
            report_payload = {"design_id": design["id"]}
            send_report({"payload": str2hex(f'{report_payload}')})
        
        elif json_data["method"] == "generate_order":
            order = generate_order(json_data["user_id"], json_data["design_id"])
            report_payload = {"order_id": order["id"]}
            send_report({"payload": str2hex(f'{report_payload}')})
        
        elif json_data["method"] == "transfer_design_to_other_user":
            design = transfer_design_to_other_user(json_data["user_id"], json_data["design_id"], json_data["other_user_id"])
            report_payload = {"design_id": design["id"]}
            send_report({"payload": str2hex(f'{report_payload}')})
            
    except Exception as e:
        msg = f"Error {e} processing data {data}"
        logger.error(f"{msg}\n{traceback.format_exc()}")
        send_report({"payload": str2hex(msg)})
        return "reject"
    
    return "accept"


def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    
    binary = hex2str(data['payload'])
    
    try:
        if binary == "list_users":
            report_payload = {"users": list_users()}
            send_report({"payload": str2hex(f'{report_payload}')})
            
        elif binary == "list_designs":
            report_payload = {"designs": list_designs()}
            send_report({"payload": str2hex(f'{report_payload}')})
        
        elif binary == "list_orders":
            report_payload = {"orders": list_orders()}
            send_report({"payload": str2hex(f'{report_payload}')})
            
    except Exception as e:
        msg = f"Error {e} processing data {data}"
        logger.error(f"{msg}\n{traceback.format_exc()}")
        send_report({"payload": str2hex(msg)})
        return "reject"
    
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
