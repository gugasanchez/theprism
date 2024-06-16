def hex2binary(hexstr):
    return bytes.fromhex(hexstr[2:])

def handle_erc20_deposit(binary):
    token_address_binary = binary[0:20]
    depositor_binary = binary[20:40]
    totalAmount = int.from_bytes(binary[40:72], "big")
    
    # Convertendo e printando os valores
    token_address_hex = "0x" + token_address_binary.hex()
    depositor_hex = "0x" + depositor_binary.hex()
    
    print(f"Token Address (Hex): {token_address_hex}")
    print(f"Depositor Address (Hex): {depositor_hex}")
    print(f"Total Amount: {totalAmount}")

handle_erc20_deposit(hex2binary("0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C11234567890abcdef1234567890abcdef1234567800000000000000000000000000000000000000000000000000000000000003e8"))
