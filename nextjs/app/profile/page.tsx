"use client";

import React from "react";
import Designs from "./_components/Designs";
import ProfileInfoForm from "./_components/ProfileInfoForm";

const Profile = () => {
  return (
    <div className="flex flex-col pt-0">
      <ProfileInfoForm />
      <Designs />
    </div>
  );
};

export default Profile;
