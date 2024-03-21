# 📒 Rollup Handler Documentation

This document provides a comprehensive overview of a Python script designed for handling various operations related to rollups on Ethereum. The script includes functionalities for interacting with ERC20 and ERC721 tokens, managing user and design data, and communicating with a rollup server.

## Overview

The script establishes a connection with a specified rollup HTTP server and performs actions based on incoming requests. It defines several operations such as adding users, generating designs, creating orders, and handling token deposits and transfers.

### Key Components

- **Environmental Variables**: Utilizes `ROLLUP_HTTP_SERVER_URL` from the environment variables to set the rollup server URL.
- **Logging**: Configured with basic logging to track the script's operations and outputs.
- **User, Design, and Order Management**: Functions to add users, generate designs based on prompts, create orders, and manage the transfer of designs between users.
- **Token Handling**: Includes functions to handle ERC20 and ERC721 token deposits, as well as sending transfer vouchers to the rollup server.
- **Communication with Rollup Server**: Functions to send notices, reports, and finish signals to the rollup server, along with handling responses.

### Functions Overview

- `add_user(name, email)`: Adds a new user with a specified name and email.
- `generate_design(prompt)`: Generates a new design based on a given prompt and encodes the associated image to base64.
- `generate_order(user_id, design_id)`: Creates a new order linking a user to a design.
- `transfer_design_to_other_user(user_id, design_id, other_user_id)`: Transfers a design from one user to another.
- `handle_erc20_deposit(data)`, `handle_erc721_deposit(data)`: Handle deposits for ERC20 and ERC721 tokens, respectively. The Handle ERC20 deposit function will be used to receive payments from the marketplace. We already integrated "Confirm Order" button to send an ERC20 transaction to the dApp and it is working locally.
- `erc20_transfer_voucher(token_address, receiver, amount)`, `erc721_safetransfer_voucher(token_address, receiver, id)`: Send transfer vouchers for ERC20 and ERC721 tokens to the rollup server.

### Running the Script

To run the script, ensure the `ROLLUP_HTTP_SERVER_URL` environment variable is set to the URL of the target rollup server. The script continuously listens for incoming requests from the rollup server and handles them according to the specified operations.

### Error Handling

The script includes error handling for unexpected issues during the execution of operations, logging errors and sending error reports to the rollup server.

## Dependencies

The script depends on several external libraries:
- `requests` for HTTP requests,
- `json` for JSON parsing,
- `logging` for logging operations,
- `traceback` for error tracking,
- `base64` for encoding images,
- `eth_abi` and `eth_abi_ext` for encoding and decoding token transfer data.

Ensure these dependencies are installed in your environment to run the script successfully.

## Conclusion

This script provides a robust framework for managing rollup-related operations, including user and design management, token handling, and communication with a rollup server. It serves as a foundational tool for integrating Ethereum rollups into various applications.

