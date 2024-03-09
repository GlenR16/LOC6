import React from "react";
import Card from "../components/Card";

import {useState, useEffect} from 'react';
import useAxiosAuth from "../api/api.js";


const games = [
  {
    id: 1,
    title: "Chess",
    categories: ["Strategy", "Board"],
    imageUrl: "https://source.unsplash.com/400x300/?chess",
  },
  {
    id: 2,
    title: "Sudoku",
    categories: ["Puzzle", "Logic"],
    imageUrl: "https://source.unsplash.com/400x300/?sudoku",
  },
  {
    id: 3,
    title: "Crossword",
    categories: ["Puzzle", "Word"],
    imageUrl: "https://source.unsplash.com/400x300/?crossword",
  },
  {
    id: 4,
    title: "Checkers",
    categories: ["Strategy", "Board"],
    imageUrl: "https://source.unsplash.com/400x300/?checkers",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    categories: ["Strategy", "Board"],
    imageUrl: "https://source.unsplash.com/400x300/?tictactoe",
  },
  {
    id: 6,
    title: "Connect Four",
    categories: ["Strategy", "Board"],
    imageUrl: "https://source.unsplash.com/400x300/?connectfour",
  },
];

export default function Dashboard() {

  const [allGames, setAllGames] = useState([]);
  const axios = useAxiosAuth();



  const handleAddGame = () => {
     
  }

  useEffect(() => {
    axios.get("/games").then((response) => {
      console.log("hello",response.data);
      setAllGames(response.data);
    });
  

  }, []);

  return (
    <div className=" flex">
      <aside
        id="default-sidebar"
        class="  top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Previous Sessions</span>
              </a>
            </li>
          </ul>
        </div>
       
      </aside>
      <div>
        <div className="divider divider-accent font-extrabold text-3xl">
          Current Games
        </div>
        <div className="p-10 flex flex-wrap gap-10 ">
          {allGames.map((game) => (
            <Card
              key={game.id}
              title={game.name}
              categories={game.tags}
              imageUrl={game?.image}
            />
          ))}
        </div>
        <div className="divider divider-accent font-extrabold text-3xl">
          All Games
        </div>
      </div>
    </div>
  );
}
