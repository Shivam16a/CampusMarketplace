import React from "react";

const ItemCarousel = ({ images }) => {
  if (!images || images.length === 0)
    return <p>No images available</p>;

  return (
    <div
      id="itemCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"   
      data-bs-pause="hover"     
      data-bs-touch="true"      
    >
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={`http://localhost:6550/uploads/${img}`}
              className="d-block w-100"
              alt="item"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#itemCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#itemCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </>
      )}
    </div>
  );
};

export default ItemCarousel;