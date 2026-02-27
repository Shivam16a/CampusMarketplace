import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import ItemCarousel from "../components/Item/ItemCarousel";
import SellerInfo from "../components/Item/SellerInfo";
import ItemInfo from "../components/Item/ItemInfo";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchItem = async () => {
    try {
      const { data } = await API.get(`/items/${id}`);
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      const exists = data.some((wishItem) => wishItem._id === id);
      setIsWishlisted(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/${id}`);
        setIsWishlisted(false);
      } else {
        await API.post(`/wishlist/${id}`);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchItem();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      checkWishlist();
    }
  }, [id]);

  if (!item) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Left - Images */}
        <div className="col-md-6">
          <ItemCarousel images={item.images} />
        </div>

        {/* Right - Info */}
        <div className="col-md-6">

          {/* ❤️ Wishlist Button */}
          <div className="text-end mb-2">
            <button
              className="btn"
              onClick={toggleWishlist}
              style={{ fontSize: "24px", border: "none" }}
            >
              {isWishlisted ? (
                <i className="fas fa-heart text-danger"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </button>
          </div>

          <ItemInfo item={item} />
          <SellerInfo seller={item.user} />

        </div>
      </div>
    </div>
  );
};

export default ItemDetails;