"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqData = [
  {
    question: "What is the purpose of this application?",
    answer:
      "This application is designed to help users manage their tasks efficiently by providing a platform to create, update, and track their activities.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button on the homepage, fill in your details, and follow the on-screen instructions to complete the registration process.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click on the 'Forgot Password' link on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password.",
  },
  {
    question: "How do I create a new task?",
    answer:
      "Navigate to the 'Tasks' section, click on the 'Add Task' button, fill in the task details, and click 'Save.'",
  },
  {
    question: "How can I edit an existing task?",
    answer:
      "Go to the 'Tasks' section, find the task you want to edit, click on the 'Edit' button next to it, make the necessary changes, and click 'Save.'",
  },
  {
    question: "How do I delete a task?",
    answer:
      "In the 'Tasks' section, locate the task you want to delete and click the 'Delete' button next to it. Confirm the deletion when prompted.",
  },
  {
    question: "What browsers are supported by this application?",
    answer:
      "Our application supports the latest versions of major browsers, including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard encryption and security practices to ensure that your data is safe and secure.",
  },
  {
    question: "How do I report a bug or provide feedback?",
    answer:
      "You can report bugs or provide feedback by navigating to the 'Support' section and clicking on 'Contact Us.' Fill out the form with your issue or feedback, and our support team will get back to you.",
  },
  {
    question: "How can I update my profile information?",
    answer: "Go to the 'Profile' section, click on 'Edit Profile,' make the necessary changes, and click 'Save.'",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, if you wish to delete your account, please navigate to the 'Settings' section, and under 'Account Management,' click on 'Delete Account.' Follow the instructions to permanently delete your account.",
  },
  {
    question: "How do I change my email address?",
    answer:
      "In the 'Profile' section, click on 'Edit Profile,' update your email address, and click 'Save.' A confirmation email will be sent to your new email address.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: number | React.SetStateAction<null>) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] p-4">
      <h1 className="text-3xl sm:text-4xl text-gradient pt-10 pb-4">FAQ</h1>
      <div className="flex flex-col w-full pt-0">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="p-4 blue-glassmorphism cursor-pointer font-bold flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </div>
            {openIndex === index && <div className="p-4 white-glassmorphism">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex justify-center items-center">
      <FAQ />
    </div>
  );
};

export default Profile;
