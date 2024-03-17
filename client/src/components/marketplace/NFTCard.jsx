import { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const style = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl overflow-hidden relative group`,
  imgContainer: `relative h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full h-full object-cover transition-transform duration-300 ease-in-out`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
  orderTab: `absolute bottom-0 left-0 right-0 top-auto bg-[#202225] py-5 px-2 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center`,
  sizeLabel: `text-white mr-2 self-center`,
  sizeWrapper: `flex items-center justify-center mb-5`,
  sizeSelect: `inline-block bg-gray-700 text-white py-1 px-3 rounded text-center cursor-pointer`,
  orderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full text-lg font-medium cursor-pointer`,
  modal: `fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10`,
  modalContent: `bg-black p-6 rounded-lg max-w-lg w-full text-white relative`, // Add 'relative' here
  closeModalButton: `bg-gray-500 text-white py-1 px-3 rounded-full absolute top-4 right-2 mt-2 mr-2`, // Position absolutely
  addressInput: `bg-gray-700 p-2 rounded text-white w-full mb-2`, // Added margin-bottom for spacing
  addressHeader: `mt-1 mb-4 text-lg`, // New style for the header text
  confirmOrderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full cursor-pointer`,
};

const NFTCard = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    stateProvinceRegion: '',
    postalCode: '',
    country: '',
  });

  const navigate = useNavigate(); // Create an instance of useNavigate

  useEffect(() => {
    const listing = listings.find(listing => listing.asset.id === nftItem.id);
    if (listing) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem.id]);

  const toggleModal = () => setShowModal(!showModal);

  const handleEstimatePrice = () => {
    // Placeholder logic for price estimation
    const estimated = "49.99 USDT";
    setEstimatedPrice(estimated);
    setShowConfirmOrder(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleConfirmOrder = () => {
    toggleModal(); // Close the modal
    navigate('/orders'); // Redirect to the orders page
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" alt="ETH Logo" className={style.ethLogo} />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={style.likes}>
          <BiHeart className={style.likeIcon} />
          {nftItem.likes}
        </div>
      </div>
      <div className={style.orderTab}>
        <div className={style.sizeWrapper}>
          <label className={style.sizeLabel}>Size:</label>
          <select className={style.sizeSelect}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button className={style.orderButton} onClick={toggleModal}>
          Order Now
        </button>
      </div>
      {showModal && (
        <div className={style.modal} onClick={toggleModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={style.closeModalButton} onClick={toggleModal}>X</button>
            <div className={style.addressHeader}>Fill in Your Shipping Address</div>
            <input className={style.addressInput} placeholder="Full Name" name="fullName" value={address.fullName} onChange={handleChange} />
            <input className={style.addressInput} placeholder="Street Address Line 1" name="streetAddress1" value={address.streetAddress1} onChange={handleChange} />
            <input className={style.addressInput} placeholder="Street Address Line 2" name="streetAddress2" value={address.streetAddress2} onChange={handleChange} />
            <input className={style.addressInput} placeholder="City" name="city" value={address.city} onChange={handleChange} />
            <input className={style.addressInput} placeholder="State/Province/Region" name="stateProvinceRegion" value={address.stateProvinceRegion} onChange={handleChange} />
            <input className={style.addressInput} placeholder="Postal Code" name="postalCode" value={address.postalCode} onChange={handleChange} />
            <input className={style.addressInput} placeholder="Country" name="country" value={address.country} onChange={handleChange} />
            {!showConfirmOrder && (
              <button className={style.confirmOrderButton} onClick={handleEstimatePrice}>
                Estimate Price
              </button>
            )}
            {showConfirmOrder && (
              <>
                <div>Estimated Price: {estimatedPrice}</div>
                <button className={style.confirmOrderButton} onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
