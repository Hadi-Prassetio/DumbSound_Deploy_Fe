import React from "react";

export default function Card({ children }) {
  return (
    <div className='max-w-sm bg-[#3A3A3A] rounded-lg shadow-md hover:bg-main/50  active:bg-main/70 cursor-pointer'>
      {children}
    </div>
  );
}
