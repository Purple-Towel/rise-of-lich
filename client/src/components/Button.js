import React from "react";

export default function Button(props) {
    const { mode, onClick } = props;

    return (
    <button onClick={onClick}>
        {mode === "ABOUT" && "Tutorial"}
        {mode === "TUTORIAL" && "About"}
    </button>
    )
}