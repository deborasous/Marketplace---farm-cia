import React from 'react';

export const ButtonCall = ({ text, textColor, className, onClick }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className={`text-${textColor} py-3 px-6 rounded w-full text-green-800 font-semibold shadow-md hover:shadow-[#a0cabe]  bg-[#0fdf96] hover:bg-[#20c194] ${className}`}
      >
        {text}
      </button>
    </div>
  );
};
