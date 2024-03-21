# syntax=docker.io/docker/dockerfile:1
FROM --platform=linux/riscv64 cartesi/python:3.10-slim-jammy

LABEL io.sunodo.sdk_version=0.2.0
LABEL io.cartesi.rollups.ram_size=4000Mi

ARG MACHINE_EMULATOR_TOOLS_VERSION=0.12.0

# Install system dependencies
RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
  busybox-static=1:1.30.1-7ubuntu3 \
  ca-certificates=20230311ubuntu0.22.04.1 \
  curl=7.81.0-1ubuntu1.15 \
  libjpeg8-dev \
  build-essential; \
  curl https://sh.rustup.rs -sSf | sh -s -- -y; \
  curl -fsSL "https://github.com/cartesi/machine-emulator-tools/releases/download/v${MACHINE_EMULATOR_TOOLS_VERSION}/machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.tar.gz" \
  | tar -C / --overwrite -xvzf -; \
  rm -rf /var/lib/apt/lists/*;

ENV PATH="/root/.cargo/bin:/opt/cartesi/bin:${PATH}"

WORKDIR /opt/cartesi/dapp
COPY ./requirements.txt .

# Ensure cache directories exist and are writable
RUN mkdir -p /root/.cache/huggingface/transformers && \
  chmod -R 777 /root/.cache/huggingface/transformers && \
  pip install --upgrade pip && \
  pip install -r requirements.txt --no-cache-dir --prefer-binary --extra-index-url https://rv.kmtea.eu/simple && \
  pip check && \
  find /usr/local/lib/python3.10/site-packages/ -name '__pycache__' -type d -exec rm -rf {} +;

# Install PyTorch separately to handle any special cases
RUN pip install --prefer-binary --extra-index-url https://rv.kmtea.eu/simple torch;

COPY ./dapp.py .
COPY ./tshirtbase.png .

ENV ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004"

# Ensure critical components are correctly installed
RUN python -c "from diffusers import StableDiffusionImg2ImgPipeline; print('diffusers loaded successfully')" || (echo "Critical Python package loading failed, investigate requirements.txt and compatibility."; exit 1)

COPY download_model.py ./download_model.py
RUN python download_model.py
COPY --from=model-downloader /model/stable_diffusion_v1_5 /opt/cartesi/dapp/model/stable_diffusion_v1_5
ENV TRANSFORMERS_CACHE=/opt/cartesi/dapp/model/stable_diffusion_v1_5
ENV HF_HOME=/opt/cartesi/dapp/model/stable_diffusion_v1_5
ENTRYPOINT ["rollup-init"]
CMD ["python3", "dapp.py"]
