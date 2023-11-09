import React from 'react';
import { Link } from 'react-router-dom';

export const Submenu = ({ options, handlePageChange }) => {
  return (
    <div>
      <ul>
        {options.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              handlePageChange;
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
