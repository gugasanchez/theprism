import React, { useState } from 'react';
import { FiClock, FiDollarSign, FiFileText, FiPackage, FiTruck, FiUserCheck, FiMessageSquare } from 'react-icons/fi';
import { BiTestTube } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { BsQuestionCircle } from 'react-icons/bs';

const Orders = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusSteps = [
    { name: 'Waiting Producer', icon: <FiClock />, date: '11/03/2024 11:02' },
    { name: 'Proposal', icon: <FiDollarSign />, price: 'US$ 49.99', date: '11/03/2024 11:03' },
    { name: 'Billed', icon: <FiFileText />, date: '11/03/2024 11:57' }, // Updated the billed date to '--' initially
    { name: 'Prepared', icon: <FiPackage />, date: '11/03/2024 12:58' },
    { name: 'Sent', icon: <FiTruck />, date: '11/03/2024 14:02' }
  ];

  const handleAccept = () => {
    setCurrentStatus('Billed');
  };

  const handleDeny = () => {
    // Handle the deny action
  };

  const statusClass = (stepName) => stepName === currentStatus ? 'text-[#00b341]' : 'text-gray-400';

  return (
    <div className="flex flex-col w-full items-center py-40 gap-20">

      <section className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h1 className="text-3xl sm:text-4xl text-white text-gradient Account pb-4">Orders Status</h1>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-row items-start justify-between w-full py-6 px-12 blue-glassmorphism rounded-lg shadow-md">
            {statusSteps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index > 0 && 'ml-10'}`}>
                <div className={`text-3xl mb-2 ${statusClass(step.name)}`}>{step.icon}</div>
                <p className={`font-bold ${statusClass(step.name)}`}>{step.name}</p>
                <p className={`text-sm ${statusClass(step.name)}`}>{step.date}</p>
                {step.price && <p className={`text-sm ${statusClass(step.name)}`}>{step.price}</p>}
                {step.name === 'Proposal' && currentStatus === 'Proposal' && (
                  <div className="flex mt-2">
                    <button onClick={handleAccept} className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2">Accept</button>
                    <button onClick={handleDeny} className="bg-red-500 text-white px-2 py-1 rounded-lg">Deny</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h2 className="text-3xl text-white text-gradient Account pb-4">Need Help?</h2>
        <p className="text-gray-200 mb-4">Our team is here to answer your questions and offer guidance.</p>
        <a href="https://twitter.com/theprism_ctsi" target="_blank" rel="noopener noreferrer">
          <FiMessageSquare className="text-4xl text-blue-500 animate-pulse" />
        </a>
      </section>  


    </div>
  );
};

export default Orders;