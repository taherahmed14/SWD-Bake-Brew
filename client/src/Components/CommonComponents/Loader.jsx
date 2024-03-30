import React from "react";
import loader from "../../Assets/loader.gif";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img width="250px" src={loader} />
      </div>
    </div>
  );
};

export default Loader;
