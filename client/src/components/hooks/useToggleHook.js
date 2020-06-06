import { useState } from "react";

//custom hook to toggle modes in our app between 2 states.
export function useToggleHook(mode1, mode2) {
    const [mode, setMode] = useState(mode1);

    const toggleState = () => {
        if (mode === mode1) {
            setMode(mode2);
        }
        if (mode === mode2) {
            setMode(mode1);
        }
    };

    return {toggleState}
}