import React from "react"
import Cell from "./Cell"
import { STAGE_HEIGHT, STAGE_WIDTH } from "../utils/helpers";
interface ComponentProps {
    stage: any[][];
}
export default (props: ComponentProps) => {
    
    const style = {
        gridTemplateRows: `repeat(${STAGE_HEIGHT}, calc(25vw / ${STAGE_WIDTH}))`,
        gridTemplateColumns: `repeat(${STAGE_WIDTH}, 1fr)`,
    }
    return(
        <div className="stage" style={style}>
            {
                props.stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} color={cell[2]}/>))
            }
        </div>
    )
}