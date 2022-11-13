import React from "react";

export default function Button({ name, className, ...event }) {
  return (
    <div>
      <button
        {...event}
        className={`${
          className
            ? className
            : "bg-btn md:px-7 md:py-1 px-2 py-1 mx-1 text-white rounded-md hover:bg-base hover:text-btn active:bg-gray-400 active:text-white"
        }`}>
        {name}
      </button>
    </div>
  );
}
