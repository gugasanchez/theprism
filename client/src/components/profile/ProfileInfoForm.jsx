import React, { useState } from 'react';

const ProfileInfoForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [walletAddress, setWalletAddress] = useState('0x123...abc');
  const [deliveryAddress, setDeliveryAddress] = useState('1234 Main St, Anytown, USA');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the data
    console.log({ name, email, walletAddress, deliveryAddress });
    setEditMode(false);
  };

  const EditButton = () => (
    <button
      type="button"
      onClick={() => setEditMode(true)}
      className="text-white text-md py-2 px-8 rounded-full cursor-pointer bg-[#3d4f7c] hover:bg-[#2952e3] transition duration-300 ease-in-out mt-4"
    >
      Edit
    </button>
  );

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h1 className="text-3xl sm:text-4xl text-white text-gradient pt-20 pb-4">Profile</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-grow flex-col justify-start items-start p-5 gap-4 blue-glassmorphism">
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              {editMode ? (
                <>
                  <label className="text-white text-md font-bold">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10"
                  />
                  <label className="text-white text-md font-bold">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10"
                  />
                  <label className="text-white text-md font-bold">Wallet Address</label>
                  <input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10"
                  />
                  <label className="text-white text-md font-bold">Delivery Address</label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10"
                  />
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-[#2952e3] text-white text-md py-2 px-8 rounded-full cursor-pointer hover:bg-[#2546bd] transition duration-300 ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <div className="">
                  <label className="text-white text-md font-bold">Name</label>
                  <div className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10">{`${name}`}</div>
                  <label className="text-white text-md font-bold">Email</label>
                  <div className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10">{`${email}`}</div>
                  <label className="text-white text-md font-bold">Wallet Address</label>
                  <div className="my-2 w-full rounded-sm p-2 mb-6 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10">{`${walletAddress}`}</div>
                  <label className="text-white text-md font-bold">Delivery Address</label>
                  <div className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism min-h-10">{`${deliveryAddress}`}</div>
                  {!editMode && <EditButton />}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
