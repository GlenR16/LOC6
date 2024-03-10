import { useState } from "react";
import Card from "./GameCard";
import "./styles.css"

function Cards() {
	const styles ={}
	const [score, setScore] = useState(0);
	const [items, setItems] = useState(
		[
			{ id: 1, pair: 2, img: "/images/cat1.jpg", stat: "" },
			{ id: 2, pair: 1, img: "/images/cat1.jpg", stat: "" },
			{ id: 3, pair: 4, img: "/images/cat2.jpg", stat: "" },
			{ id: 4, pair: 3, img: "/images/cat2.jpg", stat: "" },
			{ id: 5, pair: 6, img: "/images/cat3.jpg", stat: "" },
			{ id: 6, pair: 5, img: "/images/cat3.jpg", stat: "" },
			{ id: 7, pair: 8, img: "/images/cat4.jpg", stat: "" },
			{ id: 8, pair: 7, img: "/images/cat4.jpg", stat: "" },
			{ id: 9, pair: 10, img: "/images/cat5.jpg", stat: "" },
			{ id: 10, pair: 9, img: "/images/cat5.jpg", stat: "" },
			{ id: 11, pair: 12, img: "/images/cat6.jpg", stat: "" },
			{ id: 12, pair: 11, img: "/images/cat6.jpg", stat: "" },
			{ id: 13, pair: 14, img: "/images/cat7.jpg", stat: "" },
			{ id: 14, pair: 13, img: "/images/cat7.jpg", stat: "" },
			{ id: 15, pair: 16, img: "/images/cat8.jpg", stat: "" },
			{ id: 16, pair: 15, img: "/images/cat8.jpg", stat: "" },
		].sort(() => Math.random() - 0.5)
	);

	const [prev, setPrev] = useState(-1);

	function isPair(item1, item2) {
		if (item1.pair === item2.id) {
			return true;
		}
		return false;
	}

	function check(current) {
		if (isPair(items[current], items[prev])) {
			items[current].stat = "correct";
			items[prev].stat = "correct";
			setItems([...items]);
			setScore(score + 1);
			setPrev(-1);
		} else {
			items[current].stat = "wrong";
			items[prev].stat = "wrong";
			setItems([...items]);
			setTimeout(() => {
				items[current].stat = "";
				items[prev].stat = "";
				setItems([...items]);
				setPrev(-1);
				if (score > 0) {
					setScore(score - 1);
				}
			}, 1000);
		}
	}

	function handleClick(id) {
		if (prev === -1) {
			items[id].stat = "active";
			setItems([...items]);
			setPrev(id);
		} else {
			check(id);
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
			<div className="divider divider-accent font-extrabold text-3xl">Score : {score}</div>
			<div className="game-container">
				{items.map((item, index) => (
					<Card key={index} item={item} id={index} handleClick={handleClick} />
				))}
			</div>
			</div>
		</>
	);
}

export default Cards;
