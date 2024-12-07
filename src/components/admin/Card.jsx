// import React from "react";

function Card({ title, count, icon, highlight }) {
  return (
    <div
      className={`card shadow-md p-4 ${
        highlight ? "bg-pink-600 text-white" : "bg-base-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{count}</h2>
          <p className="text-gray-500">{title}</p>
        </div>
        <i
          className={`fas fa-${icon} text-3xl ${
            highlight ? "" : "text-gray-500"
          }`}
        ></i>
      </div>
    </div>
  );
}

export default Card;
