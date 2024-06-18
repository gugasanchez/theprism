"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import designApi, { Design } from "../../utils/designApi";

const Tests: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [createdDesign, setCreatedDesign] = useState<Design | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    designApi
      .getDesigns()
      .then(setDesigns)
      .catch((error: Error) => setError(error.message));
  }, []);

  const handleCreateDesign = async () => {
    const prompt = "An retro art of Bitcoin"; // Mock prompt
    try {
      const newDesign = await designApi.createDesign(prompt);
      setCreatedDesign(newDesign);
    } catch (error) {
      setError("Failed to create design");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <button onClick={handleCreateDesign}>Create Design</button>
        {createdDesign && <p>Design Created: {createdDesign._id}</p>}
        {error && <p>{error}</p>}
      </div>
      <div>
        {designs.map(design => (
          <div key={design._id}>
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`}
              layout="fill"
              objectFit="cover"
              alt="Design Image"
            />
            <p>{design.image_hash}</p>
            <p>{design.designId}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tests;
