import React from "react";

export default function Card(props) {

  const { title, imageUrl, categories, handleAddGame, id} = props;
  // console.log(title, imageUrl, categories, handleAddGame, id);
  return (
    <div>
      <div className="game-card w-56 h-max bg-base-100 shadow-xl">
        <figure>
          <img src={imageUrl} alt={title} />
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title">{title}</h2>
          <div className="card-actions justify-start">
            {categories.split(',').map((category, index) => (
              <div key={index} className="badge badge-outline">
                {category}
              </div>
            ))}
          </div>
          <button onClick={()=>handleAddGame(id)} className="mt-2 rounded-md hover:opacity-75 w-max p-2 ml-auto bg-[#0036C0] text-white">
            Add this game
          </button>
        </div>
      </div>
    </div>
  );
}
