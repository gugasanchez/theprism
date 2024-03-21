from diffusers import DiffusionPipeline

def download_model(model_name: str, model_save_path: str):
    # Initialize the pipeline (this will download the model)
    pipeline = DiffusionPipeline.from_pretrained(model_name)
    
    # Save the pipeline (model and tokenizer) locally
    pipeline.save_pretrained(model_save_path)

if __name__ == "__main__":
    model_name = "runwayml/stable-diffusion-v1-5"  # Model name
    model_save_path = "/app/stable_diffusion_v1_5"  # Change this path as needed

    download_model(model_name, model_save_path)
