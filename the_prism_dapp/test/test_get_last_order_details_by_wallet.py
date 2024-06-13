import pytest

@pytest.fixture
def setup_data():
    global users, designs, orders
    users = {}
    designs = {}
    orders = {}

    user1 = create_user(name="Alice", userAddress="0x1234567890abcdef1234567890abcdef12345678", email="alice@example.com")
    user2 = create_user(name="Bob", userAddress="0xabcdef1234567890abcdef1234567890abcdef12", email="bob@example.com")

    design1 = create_design(prompt="Sunset over the mountains", userAddress=user1["address"], tokenURI="http://example.com/design1")
    design2 = create_design(prompt="Ocean view", userAddress=user2["address"], tokenURI="http://example.com/design2")

    order1 = create_order(user_id=user1["id"], manufacturerAddress="0xmanufacturer1", design_id=design1["id"])
    order2 = create_order(user_id=user1["id"], manufacturerAddress="0xmanufacturer2", design_id=design2["id"])
    order3 = create_order(user_id=user2["id"], manufacturerAddress="0xmanufacturer3", design_id=design2["id"])

def test_get_last_order_details_by_wallet_address(setup_data):
    wallet_address = "0x1234567890abcdef1234567890abcdef12345678"
    order_details = get_last_order_details_by_wallet_address(wallet_address)
    assert order_details is not None, "No order details found for the given wallet address"
    assert order_details['manufacturerAddress'] == "0xmanufacturer2", "The manufacturer address should be '0xmanufacturer2'"
    assert order_details['owner'] == "0xabcdef1234567890abcdef1234567890abcdef12", "The owner of the design should be '0xabcdef1234567890abcdef1234567890abcdef12'"

users = {}
designs = {}
orders = {}

def create_user(name, userAddress, email):
    global users
    user_id = len(users) + 1
    user = {
        "id": user_id,
        "address": userAddress,
        "name": name,
        "email": email
    }
    users[user_id] = user
    return user

def create_design(prompt, userAddress, tokenURI):
    global designs
    design_id = len(designs) + 1
    design = {
        "id": design_id,
        "prompt": prompt,
        "image": tokenURI,
        "owner": userAddress
    }
    designs[design_id] = design
    return design

def create_order(user_id, manufacturerAddress, design_id):
    global orders
    order_id = len(orders) + 1
    order = {
        "id": order_id,
        "user_id": user_id,
        "design_id": design_id,
        "manufacturerAddress": manufacturerAddress
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
        owner = design["owner"]
        
        return {
            "manufacturerAddress": last_order["manufacturerAddress"],
            "owner": owner
        }
    
    except Exception as e:
        print(f"Error retrieving last order details for wallet address {wallet_address}: {e}")
        return None
