import React from "react";

type buttonProps = {
    mode: string,
    onClick: any
}

export default function Button(props: buttonProps) {
    const { mode, onClick } = props;

    return (
    <button onClick={onClick}>
        {mode === "ABOUT" && "Tutorial"}
        {mode === "TUTORIAL" && "About"}
    </button>
    )
}