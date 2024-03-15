import React from 'react';
import { Outlet } from 'react-router-dom';

const Account = () => {
  return (
    <div>
      {/* Shared Account page content, if any */}
        <h1>
            Account
        </h1>
      <Outlet /> {/* For rendering child routes like orders and profile */}
    </div>
  );
};

export default Account;
