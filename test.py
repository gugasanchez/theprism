binary_input = bytes.fromhex('001234567890abcdef1234567890abcdef12345678abcdef1234567890abcdef1234567890abcdef1234567800000000000000000000000000000064')
print(binary_input)


{"method": "create_user", "name": "Alice", "userAddress": "0x1234567890abcdef1234567890abcdef12345678", "email": "alice@example.com"}
{"method": "create_user", "name": "Bob", "userAddress": "0xabcdef1234567890abcdef1234567890abcdef12", "email": "bob@example.com"}

{"method": "create_design", "prompt": "Sunset over the mountains", "userAddress": "0x1234567890abcdef1234567890abcdef12345678", "tokenURI": "http://example.com/design1"}
#Para o NFT acima ele criou um voucher com o seguinte payload 0xa56140330000000000000000000000001234567890abcdef1234567890abcdef123456780000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001a687474703a2f2f6578616d706c652e636f6d2f64657369676e31000000000000

{"method": "create_design", "prompt": "Ocean view", "userAddress": "0xabcdef1234567890abcdef1234567890abcdef12", "tokenURI": "http://example.com/design2"}

{"method": "create_order", "user_id": 1, "manufacturerAddress": "0xmanufacturer1", "design_id": 1}
{"method": "create_order", "user_id": 1, "manufacturerAddress": "0xmanufacturer2", "design_id": 2}
{"method": "create_order", "user_id": 2, "manufacturerAddress": "0xmanufacturer3", "design_id": 2}

{"method": "erc20_test", "input": "0x59b670e9fA9D0A427751Af201D676719a970857b1234567890abcdef1234567890abcdef1234567800000000000000000000000000000000000000000000000000000000000003e8"}

{"method": "create_design", "prompt": "prompt teste", "userAddress": "0xdesignerwallet", "tokenURI": "www.teste.com"}
