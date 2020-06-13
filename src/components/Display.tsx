import React from "react"

interface ComponentProps {
    text: String;
    gameOver: boolean;
}

export default (props: ComponentProps) => {
    const style = {
        color: props.gameOver ? '#ff0000' : '#999'
    }
    return (
        <div className="display" style={style}>{props.text}</div>
    )
}