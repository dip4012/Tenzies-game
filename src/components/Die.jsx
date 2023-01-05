import "./Die.css"
import React from "react"

function Die(props) {
	return (
		<div
			className={`die ${props.die.isHeld ? "locked" : ""}`}
			onClick={() => {
				props.holdDice(props.die.id)
			}}
		>
			{props.die.value}
		</div>
	)
}

export default Die
