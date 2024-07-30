import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NFTCard from "../../components/NFTCard";
import designApi, { Design } from "../../utils/designApi";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const MarketplaceHighlights: React.FC = () => {
  // State to store the fetched designs and loading state
  const [designs, setDesigns] = useState<Design[]>([]);
  const router = useRouter(); // Router for navigation
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Function to fetch the latest designs from the API
    const fetchDesigns = async () => {
      setIsLoading(true); // Set loading to true at the start
      try {
        // Fetch designs from the API
        const fetchedDesigns = await designApi.getDesigns();
        // Get the latest 5 designs by reversing the array and slicing
        const latestDesigns = fetchedDesigns.reverse().slice(0, 5);
        setDesigns(latestDesigns); // Set the fetched designs to state
      } catch (error) {
        console.error("Failed to fetch designs:", error); // Log any errors
      }
      setIsLoading(false); // Set loading to false after fetching
    };

    fetchDesigns(); // Call the function to fetch designs
  }, []);

  /**
   * Handle navigation to the marketplace page.
   * Triggered when the "View All" button is clicked.
   */
  const handleViewAll = () => {
    router.push("/marketplace");
  };

  /**
   * Component to display a loading placeholder while data is being fetched.
   * Uses a simple animation to indicate loading.
   */
  const SkeletonPlaceholder = () => (
    <div className="animate-pulse flex flex-wrap justify-center gap-4">
      {/* Generate 5 placeholders */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl bg-gray-300"></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-grow py-20 gradient-bg-marketplacehl">
      <div className="flex flex-grow flex-col items-start justify-start mt-20">
        <h1 className="text-3xl sm:text-5xl text-gradient">Latest Collections</h1>
        <div className="flex items-center justify-between w-full my-8">
          {isLoading ? (
            <SkeletonPlaceholder /> // Display loading placeholder if data is still loading
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-center">
                {/* Render NFTCards for each design */}
                {designs.map((design, index) => (
                  <NFTCard
                    key={design._id} // Unique key for each component
                    nftItem={{
                      id: design._id,
                      image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                      name: design.prompt,
                      likes: 10, // Placeholder for likes
                    }}
                    title="Latest Collection"
                    listings={[]} // Placeholder for listings
                    index={index} // Index of the current design in the array
                  />
                ))}
              </div>
              <div className="flex flex-col items-center justify-center gap-2 ml-10">
                {/* Button to navigate to the marketplace page */}
                <button
                  className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                  onClick={handleViewAll}
                >
                  View All
                  <ArrowRightIcon className="h-4 w-4 ml-2" /> {/* Icon for button */}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHighlights;
