import { useState } from "react";

export function useSelectHook(states: string[]) {
    const [ selected, setSelected ] = useState(states[0]);

    const selectStateIndex = (index: number) => {
        setSelected(states[index]);
    }


    return { selected, selectStateIndex }
}