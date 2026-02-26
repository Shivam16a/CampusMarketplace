import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import ItemCarousel from "../components/Item/ItemCarousel";
import SellerInfo from "../components/Item/SellerInfo";
import ItemInfo from "../components/Item/ItemInfo";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    try {
      const { data } = await API.get(`/items/${id}`);
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!item) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side - Images */}
        <div className="col-md-6">
          <ItemCarousel images={item.images} />
        </div>

        {/* Right Side - Item Info */}
        <div className="col-md-6">
          <ItemInfo item={item} />
          <SellerInfo seller={item.user} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;