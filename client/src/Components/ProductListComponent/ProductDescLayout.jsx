import React, { useState } from "react";
import Carousal from "../CarousalComponent/Carousal";
import "./ProductDescLayout.modules.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Button } from "@mui/material";
import quality from "../../Assets/qaulity.jpg";
import free_shipping from "../../Assets/free_shipping.jpg";
import replacement from "../../Assets/replacement.jpg";
import fiveyear from "../../Assets/fiveyears.jpg";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Divider from "@mui/material/Divider";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import feature1 from "../../Assets/feature-1.png";
import feature2 from "../../Assets/feature-2.png";
import feature3 from "../../Assets/feature-3.png";
import feature4 from "../../Assets/feature-4.png";
import feature5 from "../../Assets/feature-5.png";
import feature6 from "../../Assets/feature-6.png";
import { getProductsById } from "../../Services/NextronAppServices";
import Loader from "../CommonComponents/Loader";

export const ProductDescLayout = ({ cartItems, handleAddToCart }) => {
  const [quantity, setQunatity] = useState(1);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [img, setImage] = useState();
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getProductDetail();
  }, []);

  useEffect(() => {
    // console.log("Product length: ", product);
    if (product?.images?.length > 0) {
      setImage([
        {
          original: `data:image/png;base64,${product?.images[0]}`,
          thumbnail: `data:image/png;base64,${product?.images[0]}`,
        },
        {
          original: `data:image/png;base64,${product?.images[1]}`,
          thumbnail: `data:image/png;base64,${product?.images[1]}`,
        },
        {
          original: `data:image/png;base64,${product?.images[2]}`,
          thumbnail: `data:image/png;base64,${product?.images[2]}`,
        },
      ]);
    }
  }, [product]);

  const getProductDetail = async () => {
    // console.log("Id: ", id);
    getProductsById(id)
      .then((res) => {
        console.log("All Products: ", res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setIsLoading(false);
      });
  };

  const handleChange = (l) => {
    setQunatity(quantity + l);
  };
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="desc_main_div">
        <div className="desc_img">
          {product?.images?.length > 0 ? (
            <Carousal
              showThumbnails={true}
              autoPlay={false}
              thumbnailPosition={"left"}
              img={img}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="desc_listing">
          <div>
            <div className="navigation">
              <span className="navigationDiv" onClick={() => navigate(`/`)}>
                Home
              </span>{" "}
              >
              <span className="navigationDiv" onClick={() => navigate(`/shop`)}>
                All Products
              </span>{" "}
              > Nextron
            </div>
          </div>
          <p className="product_name">{product?.product?.title}</p>
          <div className="sold_and_review">
            {product?.product?.availableStatus ? (
              <div className="soldout">In Stock</div>
            ) : (
              <div className="soldout">Sold</div>
            )}
          </div>
          <div className="price_div">
            {/* <div className="striked-off-price">Rs 2500.00</div> */}
            <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
              € {product?.product?.offerPrice} <span style={{textDecoration: "line-through"}}>€ {product?.product?.MRPprice} </span> 
              <span style={{color: "blue"}}> {product?.product?.discount}% off</span>
            </div>
          </div>
          <div className="qty-div">
            <div className="select-qty">
              <div
                style={{
                  width: "100%",
                  height: "fitContent",
                  display: "flex",
                  // border: "1px solid black",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    width: "5px",
                    height: "30px",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(1)}
                  disabled={quantity === 5}
                >
                  +
                </Button>
                <div className="qunaity">{quantity}</div>
                {quantity > 1 ? (
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      backgroundColor: "black",
                      width: "5px",
                      height: "30px",
                      borderRadius: "0px",
                      // border:"1px solid red"
                    }}
                    onClick={() => handleChange(-1)}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="addtocart">
              {/* <NavLink style={{ textDecoration: "none" }} to="/cart"> */}
              <Button
                variant="contained"
                style={{
                  margin: "0px",
                  backgroundColor: "black",
                  width: "150px",
                  height: "35px",
                  borderRadius: "0px",
                }}
                onClick={() => {
                  handleAddToCart(product.product, product.images[0], quantity);
                }}
              >
                Add To Cart
              </Button>
              {/* </NavLink> */}
            </div>
          </div>
        </div>
      </div>
      <div className="desc_prod">
        <div className="add">
          <div className="desc_box">
            <img className="img_add" src={quality} alt="quality" />
          </div>
          <div className="desc_box">
            <img className="img_add" src={free_shipping} alt="free_ship" />
          </div>
          <div className="desc_box">
            <img
              className="img_add"
              style={{ width: "130px", height: "60px", marginTop: "25px" }}
              src={replacement}
              alt="replacemnt"
            />
          </div>
          <div className="desc_box">
            <img
              className="img_add"
              style={{ width: "120px" }}
              src={fiveyear}
              alt="fiveyear"
            />
          </div>
        </div>
      </div>
      <div className="detailed-desc">
        <h2 style={{ paddingLeft: "100px" }}>Product Description</h2>
        <div className="product_description">
          {product?.product?.description}
        </div>
        <h2 style={{ paddingLeft: "100px" }}>Product Specifications</h2>
        <div className="tavle">
          <div className="table_splt">
            <p className="desc_heading">General Specifications</p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Category : </b> {product?.product?.category}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Generator Compatibility : </b>{" "}
                {product?.product?.generatorCompatibility}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Color</b> : {product?.product?.color}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Model ID : </b> {product?.product?.modelId}
              </span>
            </p>
            <Divider />
            <p className="desc_heading">Dimension and Body Specs</p>

            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Weight : </b>
                {product?.product?.weight}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Material : </b>
                {product?.product?.material}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Display Type : </b>
                {product?.product?.displayType}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Indicator Type : </b>
                {product?.product?.indicatorType}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Surge Indicator : </b>
                {product?.product?.surgeIndicator}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Master Switch : </b>
                {product?.product?.masterSwitch}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Mount Type : </b>
                {product?.product?.mountType}
              </span>
            </p>
          </div>
          <div className="table_splt2">
            <p className="desc_heading">Warranty Details</p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Warranty Summary :</b> {product?.product?.warranty}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Covered in Warranty : </b>{" "}
                {product?.product?.coveredInWarranty}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Not Covered in Warranty : </b>{" "}
                {product?.product?.notCoveredInWarranty}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Warranty Service Type : </b>{" "}
                {product?.product?.warrantyServiceType}
              </span>
            </p>
            <Divider />
            <p className="desc_heading">Power Features</p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Minimum Input Power : </b>{" "}
                {product?.product?.minimumInputPower}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Maximum Input Power : </b>{" "}
                {product?.product?.maximumInputPower}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Minimum Output Power : </b>{" "}
                {product?.product?.minimumOutputPower}
              </span>
            </p>
            <p>
              <ElectricBoltIcon fontSize="20px" />
              <span className="desc-desc">
                <b>Maximum Output Power : </b>{" "}
                {product?.product?.maximumOutputPower}
              </span>
            </p>
          </div>
        </div>

        <h2 style={{ paddingLeft: "100px" }}>Product Features</h2>
        <div className="product-features-container">
          <div className="product-features-div">
            <div>
              <img src={feature1} alt="" />
            </div>
            <div>
              <div>
                <strong>Microprocessor-controlled Circuit</strong>
              </div>
              <p>
                Thanks to its microprocessor-controlled circuit, the Nextron
                Stabiliser can keep your connected devices safe from voltage
                fluctuations, making it ideal for up to 139.7 cm (55) LED TV,
                set-top box, home theatre, DTH, etc.
              </p>
            </div>
          </div>

          <div className="product-features-div">
            <div>
              <img src={feature2} alt="" />
            </div>
            <div>
              <div>
                <strong>Copper Winding</strong>
              </div>
              <p>
                Built with copper winding, this voltage stabiliser has less
                power loss, low heat generation, and has enhanced power factor,
                thereby helping you save power.
              </p>
            </div>
          </div>

          <div className="product-features-div">
            <div>
              <img src={feature3} alt="" />
            </div>
            <div>
              <div>
                <strong>Smart Voltage Correction</strong>
              </div>
              <p>
                By regulating voltage according to the variation in supplied
                voltage, this voltage stabiliser delivers optimal performance
                and ensures the safe operation of the connected devices.
              </p>
            </div>
          </div>

          <div className="product-features-div">
            <div>
              <img src={feature4} alt="" />
            </div>
            <div>
              <div>
                <strong>Time Delay</strong>
              </div>
              <p>
                Thanks to its time delay system of 10 seconds to up to 15
                seconds, this voltage stabiliser allows the compressor to
                balance before restarting.
              </p>
            </div>
          </div>

          <div className="product-features-div">
            <div>
              <img src={feature5} alt="" />
            </div>
            <div>
              <div>
                <strong>Hi-low Cut-off</strong>
              </div>
              <p>
                When the voltage input is high or low, this voltage stabiliser
                quickly cuts off the power and protects your TV. So, you can
                watch your favourite content on a large screen without worrying
                about voltage surges.
              </p>
            </div>
          </div>

          <div className="product-features-div">
            <div>
              <img src={feature6} alt="" />
            </div>
            <div>
              <div>
                <strong>Surge Protection</strong>
              </div>
              <p>
                Owing to its surge protection, this voltage stabiliser ensures
                the utmost safety of the connected devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
