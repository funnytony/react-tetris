import React from "react"
interface ComponentProps {
    onStart: () => void;
}
export default (props: ComponentProps) => {
    return(
        <button className="button-wrap" onClick={props.onStart}>Start</button>
    )
}