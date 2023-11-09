import React from 'react';

export const ButtonGosth = ({
  text,
  textColor,
  className,
  onClick,
  disabled,
}) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`text-${textColor} py-[9px] pr-10 pl-10 border-2 hover:border-[#0fdf96] cursor-pointer rounded ${className}`}
      >
        {text}
      </button>
    </div>
  );
};
