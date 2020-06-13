import React from "react"
interface ComponentProps {
    type: number;
    color: string;
}

const Cell = (props: ComponentProps) => {
    const style = {
        background: `rgba(${props.color}, 0.8)`,
        border: props.type === 0 ? '0px solid' : '4px solid',
        borderBottomColor: `rgba(${props.color}, 0.1 )`,
        borderTopColor: `rgba(${props.color}, 1)`,
        borderLeftColor: `rgba(${props.color}, 0.3)`,
        borderRightColor: `rgba(${props.color}, 1)`
    }
    return (
        <div className="tetris-cell" style={style}></div>
    )
}

export default React.memo(Cell);