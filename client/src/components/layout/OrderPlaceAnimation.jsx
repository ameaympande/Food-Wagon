import React from "react";
import checkGif from "../../assets/orderplaced.gif"

const OrderPlacedAnimation = ({ showAnimation }) => {
    const animationStyle = {
        mixBlendMode: 'multiply',
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        display: showAnimation ? "block" : "none"
    };

    return (
        <div style={animationStyle} >
            {showAnimation && (
                <>
                    <img
                        src={checkGif}
                        alt="Order Placed Animation"
                        width="250"
                        height="250"

                    />
                    <h2 className="text-2xl font-bold mb-2">Order Placed Sucessfully.</h2>
                </>
            )}
        </div>
    );
};

export default OrderPlacedAnimation;
