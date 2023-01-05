import { useEffect, useState } from "react"
import "./App.css"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
	const [tenzies, setTenzies] = useState(false)
	const [dice, setDice] = useState(allNewDice())

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const allSameValue = dice.every((die) => die.value === dice[0].value)
		if (allHeld && allSameValue) {
			setTenzies(true)
			console.log("You won")
		}
	}, [dice])

	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			})
		}
		return newDice
	}

	function rollDice() {
		if (tenzies) {
			setTenzies(false)
			setDice(allNewDice)
		} else {
			setDice((oldDice) =>
				oldDice.map((die) =>
					die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
				)
			)
		}
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
		)
	}

	return (
		<main>
			{tenzies && (
				<Confetti width={window.innerWidth} height={window.innerHeight} />
			)}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are same. Click each die to freeze it at its current
				value between rolls.
			</p>
			<div className="die-container">
				{dice.map((die) => (
					<Die key={die.id} die={die} holdDice={holdDice} />
				))}
			</div>
			<button className="roll-btn" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	)
}

export default App
