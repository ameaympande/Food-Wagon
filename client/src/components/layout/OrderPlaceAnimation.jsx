import React from "react";

const OrderPlacedAnimation = ({ showAnimation }) => {
    // Style for the animation component
    const animationStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999, // Ensure the animation appears on top of other content
        display: showAnimation ? "block" : "none"
    };

    return (
        <div style={animationStyle}>
            {showAnimation && (
                <img
                    src="path_to_your_animation.gif"
                    alt="Order Placed Animation"
                    width="200"
                    height="200"
                />
            )}
        </div>
    );
};

export default OrderPlacedAnimation;
