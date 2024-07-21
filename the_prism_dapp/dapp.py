from os import environ
from eth_abi import encode
import logging
import requests
import json
import traceback
import base64
from eth_abi.abi import encode
from urllib.parse import urlparse
from Crypto.Hash import keccak
from cartesi_wallet.util import hex_to_str, str_to_hex

import cartesi_wallet.wallet as Wallet

wallet = Wallet
rollup_address = None;

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = "http://localhost:5004"
if "ROLLUP_HTTP_SERVER_URL" in environ:
    rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]

logger.info(f"HTTP rollup_server url is {rollup_server}")

TRANSFER_FUNCTION_SELECTOR = b'\xa9\x05\x9c\xbb'
SAFE_TRANSFER_FUNCTION_SELECTOR = b'\x42\x84\x2e\x0e'
ERC20_PORTAL_ADDRESS = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB"
ERC721_PORTAL_ADDRESS = "0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87"
DAPP_RELAY_ADDRESS = "0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE" 
DESIGN_NFT_ADDRESS = "0x4C17C1E23e37868cFf4cA260Ed6d39E347636207"
USDT_ADDRESS = "0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1"


def keccak_256_hex_pycryptodome(data):
    k = keccak.new(digest_bits=256)
    k.update(data)
    return hex(int.from_bytes(k.digest()[:4], 'big'))

KECCAK_CREATE_NFT_FUNCTION_SIGNATURE = keccak_256_hex_pycryptodome(b"createNFT(address,string)")
KECCAK_ERC20_FUNCTION_SIGNATURE = keccak_256_hex_pycryptodome(b"transfer(address,uint256)")

user_id = 0
design_id = 0
order_id = 0

users = {}
designs = {}
orders = {}

def encode_v2(d):
    return "0x" + json.dumps(d).encode("utf-8").hex()

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
    
def send_voucher(voucher: str) -> None:
    send_post("voucher", voucher)

def send_post(endpoint, json_data) -> None:
    response = requests.post(rollup_server + f"/{endpoint}", json=json_data)
    logger.info(
        f"/{endpoint}: Received response status {response.status_code} body {response.content}")
    
    
def create_user(name, userAddress, email):
    global user_id

    for user in users.values():
        if user["address"] == userAddress:
            user["name"] = name
            user["email"] = email
            return user

    user_id += 1
    new_user = {
        "id": user_id,
        "address": userAddress,
        "name": name,
        "email": email,
        "status": "active"
    }
    users[user_id] = new_user
    return new_user

def get_user_id_by_address(userAddress):
    for user in users.values():
        if user['address'] == userAddress:
            return user['id']
    return None 

def create_design(prompt, userAddress, tokenURI):
    global design_id
    design_id += 1
    design = {
        "id": design_id,
        "prompt": prompt,
        "image": tokenURI,
        "owner": userAddress
    }
    designs[design_id] = design

    return design


def create_order(user_id, design_id, manufacturerAddress):
    global order_id
    order_id += 1
    order = {
        "id": order_id,
        "user_id": user_id,
        "design_id": design_id,
        "manufacturerAddress": manufacturerAddress,
        "status": "pending"
    }
    orders[order_id] = order
    return order

def get_last_order_details_by_wallet_address(wallet_address):
    try:
        user_id = None
        for user in users.values():
            if user['address'].lower() == wallet_address.lower():
                user_id = user['id']
                break
        
        if user_id is None:
            raise ValueError("User not found for the given wallet address")
        
        user_orders = [order for order in orders.values() if order['user_id'] == user_id]

        if not user_orders:
            raise ValueError("No orders found for the given user_id")
        
        last_order = user_orders[-1]
        
        design_id = last_order["design_id"]
        if design_id not in designs:
            raise ValueError("Design not found for the given design_id")
        
        design = designs[design_id]
        designOwner = design["owner"]
        
        return {
            "manufacturerAddress": last_order["manufacturerAddress"],
            "designOwner": designOwner
        }
    
    except Exception as e:
        logger.error(f"Error retrieving last order details for wallet address {wallet_address}: {e}")
        return None

def NFT_create_voucher(_to, _tokenURI) -> dict:
    global KECCAK_CREATE_NFT_FUNCTION_SIGNATURE

    data = encode(['address', 'string'], [_to, _tokenURI])
    voucherPayload = KECCAK_CREATE_NFT_FUNCTION_SIGNATURE + data.hex()
    voucher = {"destination": DESIGN_NFT_ADDRESS, "payload": voucherPayload}
    return voucher

def transfer_design_to_other_user(design_id, other_user_id):
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

def create_erc20_payload(erc20_address, user_address, amount):
    amount_hex = hex(amount)[2:].zfill(64)
    
    erc20_address = erc20_address[2:] if erc20_address.startswith('0x') else erc20_address
    user_address = user_address[2:] if user_address.startswith('0x') else user_address
    
    if len(erc20_address) != 40 or len(user_address) != 40:
        raise ValueError("Invalid ERC-20 or user address")

    payload = f"0x01{erc20_address}{user_address}{amount_hex}"
    
    return payload

def handle_erc20_deposit(binary):
    token_binary = binary[1:21]
    depositor_binary = binary[21:41]
    totalAmount = int.from_bytes(binary[41:73], "big")
    manufacturerAmount = totalAmount * 9 // 10
    designerAmount = totalAmount - manufacturerAmount
    depositor_address = binary2hex(depositor_binary)
    token_address = binary2hex(token_binary)

    result = get_last_order_details_by_wallet_address(depositor_address)

    if result:
        manufacturer_address, designOwner = result['manufacturerAddress'], result['designOwner']

        manufacturer_payload = create_erc20_payload(token_address, manufacturer_address, manufacturerAmount)
        designer_payload = create_erc20_payload(token_address, designOwner, designerAmount)

        manufacturer_notice = wallet.erc20_deposit_process(manufacturer_payload)
        manufacturer_response = requests.post(rollup_server + "/notice", json={"payload": manufacturer_notice.payload})
        
        designer_notice = wallet.erc20_deposit_process(designer_payload)
        designer_response = requests.post(rollup_server + "/notice", json={"payload": designer_notice.payload})
        print(f"Manufacturer Address: {manufacturer_address}")
        print(f"Design Owner: {designOwner}")
    else:
        print("No order details found for the given wallet address")

    notice_str = f"Deposit received from: {depositor_address}; ERC-20: {token_address}; Amount: {totalAmount}; Manufacturer address: {manufacturer_address}; Designer address: {designOwner}"
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

    # logger.info(f"Receiving advance request with data {hex2str(data['payload'])} from {data['metadata']['msg_sender']}")
    try:
        binary = hex2str(data['payload'])
        json_data = json.loads(binary)    
    except:
        binary = hex2binary(data['payload'])
    
    try:
        
        msg_sender = data["metadata"]["msg_sender"]
        
        if msg_sender.lower() == DAPP_RELAY_ADDRESS.lower():
            rollup_address = data['payload']
            send_report({"payload": str2hex(f"Set rollup_address {rollup_address}")})
        
        elif msg_sender.lower() == ERC20_PORTAL_ADDRESS.lower():   
            handle_erc20_deposit(hex2binary(data['payload']))
        
        elif json_data["method"] == "erc20_test_withdraw":
            voucher1 = wallet.erc20_withdraw("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", USDT_ADDRESS, 1)
            response1 = requests.post(rollup_server + "/voucher", json={"payload": voucher1.payload, "destination": voucher1.destination})

            voucher2 = wallet.erc20_withdraw("0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87", USDT_ADDRESS, 3)
            response2 = requests.post(rollup_server + "/voucher", json={"payload": voucher2.payload, "destination": voucher2.destination})

        elif json_data["method"] == "erc20_withdraw":
            withdraw_amount = wallet.balance_get(msg_sender).erc20_get(USDT_ADDRESS.lower())
            print(f"Wallet do user: {msg_sender}")    
            print(f"Saldo do usuário a ser sacado: {withdraw_amount}")    

            # converted_value = int(json_data["amount"]) if isinstance(json_data["amount"], str) and json_data["amount"].isdigit() else json_data["amount"]
            voucher = wallet.erc20_withdraw(msg_sender, USDT_ADDRESS, withdraw_amount)
            response = requests.post(rollup_server + "/voucher", json={"payload": voucher.payload, "destination": voucher.destination})

        elif json_data["method"] == "transfer_erc721":
            erc721_safetransfer_voucher(json_data["token_address"], json_data["receiver"], json_data["id"])
        
        elif json_data["method"] == "transfer_erc20":
            erc20_transfer_voucher(json_data["token_address"], json_data["receiver"], json_data["amount"])
        
        elif json_data["method"] == "create_user":
            user = create_user(json_data["name"], json_data["userAddress"], json_data["email"])
            report_payload = {"user_id": user["id"]}
            send_report({"payload": str2hex(f'{report_payload}')})
            
        elif json_data["method"] == "create_design":
            design = create_design(json_data["prompt"], json_data["userAddress"], json_data["uri"])
            NFT_voucher = NFT_create_voucher(json_data["userAddress"], json_data["uri"])
            report_payload = {"design_id": design["id"]}
            send_voucher(NFT_voucher)
            send_report({"payload": str2hex(f'{report_payload}')})
        
        elif json_data["method"] == "create_order":
            msgsender_id = get_user_id_by_address(msg_sender)
            order = create_order(msgsender_id, json_data["design_id"], json_data["manufacturerAddress"])
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
        url = urlparse(hex_to_str(data["payload"]))

        if url.path.startswith("balance/"):
            info = url.path.replace("balance/", "").split("/")
            token_type, account = info[0].lower(), info[1].lower()
            token_address, token_id, amount = "", 0, 0

            if (token_type == "ether"):
                amount = wallet.balance_get(account).ether_get()
            elif (token_type == "erc20"):
                token_address = info[2]
                amount = wallet.balance_get(account).erc20_get(token_address.lower())
            elif (token_type == "erc721"):
                token_address, token_id = info[2], info[3]
                amount = 1 if token_id in wallet.balance_get(account).erc721_get(token_address.lower()) else 0
            
            report = {"payload": encode_v2({"token_id": token_id, "amount": amount, "token_type": token_type})}
            response = requests.post(rollup_server + "/report", json=report)
            logger.info(f"Received report status {response.status_code} body {response.content}")

        if binary == "list_users":
            report_payload = {"users": list_users()}
            send_report({"payload": str2hex(f'{report_payload}')})
            
        elif binary == "list_designs":
            report_payload = {"designs": list_designs()}
            send_report({"payload": str2hex(f'{report_payload}')})
        
        elif binary == "list_orders":
            report_payload = {"orders": list_orders()}
            send_report({"payload": str2hex(f'{report_payload}')})

        return "accept"

            
    except Exception as e:
        msg = f"Error {e} processing data {data}"
        logger.error(f"{msg}\n{traceback.format_exc()}")
        send_report({"payload": str2hex(msg)})
        return "reject"



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