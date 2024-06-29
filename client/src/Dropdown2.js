// Dropdown.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectOption } from './actions';

const Dropdown2 = ({ dispatch, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
 

  const options = [
    { value: 1, label: 'Open' },
    { value: 2, label: 'In Dev' },
    { value: 3, label: 'Testing' },
    { value: 4, label: 'Production' },
    { value: 5, label: 'Closed' },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    // dispatch(selectOption(option.value));
    onSelect(option.label); // Pass the selected option to the TodoForm component
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        {'Change status'}
      </button>
      {isOpen ? (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selectedOption: state.dropdown.selectedOption };
};

export default connect(mapStateToProps)(Dropdown2);