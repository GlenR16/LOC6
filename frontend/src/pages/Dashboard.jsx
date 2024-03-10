import React from "react";
import AddCard from "../components/AddCard.jsx";
import RemoveCard from "../components/RemoveCard.jsx";
import { useState, useEffect } from "react";
import useAxiosAuth from "../api/api.js";




export default function Dashboard() {
	const [allGames, setAllGames] = useState([]);
	const [userGames, setUserGames] = useState([]);
	const axios = useAxiosAuth();
	const [refresh, setRefresh] = useState(false);

	const handleAddGame = (id) => {
		axios.post(`user/games/${id}/`, {}).then((response) => {
			console.log('handleAdd',response);
		});
		setRefresh(!refresh);
	};

	const handleRemoveGame = (id) => {

		axios.delete(`user/games/${id}/`, {}).then((response) => {
			console.log('handleAdd',response);
		});
		setRefresh(!refresh);
	};


	useEffect(() => {
		axios.get("/games/").then((response) => {
			const uniqueGames = [];
      		const uniqueIds = new Set();
      
      response.data.forEach(game => {
        if (!uniqueIds.has(game.id)) {
          uniqueIds.add(game.id);
          uniqueGames.push(game);
        }
      });
			setAllGames(uniqueGames);
		});
		axios.get("/user/games/").then((response) => {
				setUserGames(response.data);
				console.log('userGames',userGames)
		})
	}, [refresh]);

	return (
		<div className=" flex  justify-center">
			<div className="w-4/5">
				<div className="divider divider-accent font-extrabold text-3xl">Current Games</div>
				<div className="p-10 flex flex-wrap gap-10 ">
                    {
                    userGames.length == 0?
                    <div className="fs-5 text-center w-full">
                        No games added yet!
                    </div>
                    :
					userGames.map((game) => (
						<RemoveCard handleRemoveGame={handleRemoveGame} key={game.id} title={game.name} categories={game.tags} id={game.id} imageUrl={game?.image} />
					))
                    }
				</div>
				<div className="divider divider-accent font-extrabold text-3xl">All Games</div>
				<div className="p-10 flex flex-wrap gap-10 ">
					{allGames.map((game) => (
						<AddCard handleAddGame={handleAddGame} key={game.id} id={game.id} title={game.name} categories={game.tags} imageUrl={game?.image} />
					))}
				</div>
			</div>
		</div>
	);
}
