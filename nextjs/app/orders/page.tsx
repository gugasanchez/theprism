"use client";

import React, { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  InboxStackIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

interface StatusStep {
  name: string;
  icon: JSX.Element;
  date: string;
  price?: string;
}

const Orders: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<string>("Waiting Producer");

  const statusSteps: StatusStep[] = [
    { name: "Waiting Producer", icon: <ClockIcon className="h-6 w-6" />, date: "11/03/2024 11:02" },
    {
      name: "Proposal",
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      price: "US$ 49.99",
      date: "11/03/2024 11:03",
    },
    { name: "Billed", icon: <DocumentTextIcon className="h-6 w-6" />, date: "11/03/2024 11:57" },
    { name: "Prepared", icon: <InboxStackIcon className="h-6 w-6" />, date: "11/03/2024 12:58" },
    { name: "Sent", icon: <TruckIcon className="h-6 w-6" />, date: "11/03/2024 14:02" },
  ];

  const handleAccept = () => {
    setCurrentStatus("Billed");
  };

  const handleDeny = () => {
    // Handle the deny action
  };

  const statusClass = (stepName: string) => (stepName === currentStatus ? "text-[#00b341]" : "");

  return (
    <div className="flex flex-col w-full items-center py-20 gap-20">
      <section className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h1 className="text-3xl sm:text-5xl sm:items-start items-center sm:text-start text-center text-gradient pb-4">
          Orders Status
        </h1>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex sm:flex-row flex-col blue-glassmorphism sm:items-start items-center justify-between w-full py-6 sm:px-12 px-4 rounded-3xl shadow-md shadow-secondary border border-base-300">
            {statusSteps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index > 0 ? "" : ""}`}>
                <div className={`text-3xl sm:mt-0 mt-4${statusClass(step.name)}`}>{step.icon}</div>
                <p className={`font-bold my-3 ${statusClass(step.name)}`}>{step.name}</p>
                <p className={`text-sm my-0 ${statusClass(step.name)}`}>{step.date}</p>
                {step.price && <p className={`text-sm my-1 ${statusClass(step.name)}`}>{step.price}</p>}
                {step.name === "Proposal" && currentStatus === "Proposal" && (
                  <div className="flex mt-2">
                    <button onClick={handleAccept} className="bg-green-500 px-2 py-1 rounded-lg mr-2">
                      Accept
                    </button>
                    <button onClick={handleDeny} className="bg-red-500 px-2 py-1 rounded-lg">
                      Deny
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h2 className="text-3xl text-gradient">Need Help?</h2>
        <p className="m-0 mb-2 p-0">Our team is here to answer your questions and offer guidance.</p>
        <a href="https://t.me/guga_sanchez" target="_blank" rel="noopener noreferrer">
          <ChatBubbleBottomCenterIcon className="h-8 w-8 text-blue-500 animate-pulse" />
        </a>
      </section>
    </div>
  );
};

export default Orders;
