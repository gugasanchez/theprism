import React from 'react';
import ProfileInfoForm from "../components/profile/ProfileInfoForm";
import Designs from "../components/profile/Designs";

const Profile = () => {
  return (
    <div className="flex flex-col pt-8">
      <ProfileInfoForm />
      <Designs />
    </div>
  );
};

export default Profile;
