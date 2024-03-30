import shock from "../../Assets/shock.png";
const NoItemCart = () => {
  return (
    <>
      <div
        style={{
          width: "60%",
          height: "300px",
          margin: "auto",
        //   border: "1px solid red",
        }}
      >
        <div
          style={{
            margin: "auto",
            // border: "1px solid red",
            width: "200px",
            height: "200px",
          }}
        >
          <img
            style={{ width: "200px", height: "200px", margin: "auto" }}
            src={shock}
            alt="shock"
          />
        </div>
        <h2 style={{ textAlign: "center" }}>Your Cart is empty!</h2>
      </div>
    </>
  );
};

export default NoItemCart;
