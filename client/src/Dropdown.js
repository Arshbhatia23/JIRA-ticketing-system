// Dropdown.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectOption } from './actions';

const Dropdown = ({ dispatch, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedval , setSelectedVal] = useState('');
  const options = [
    { value: 1, label: 'Highest' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Low' },
  ];


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    setSelectedVal(option.value);
    onSelect(option.value); // Pass the selected option to the TodoForm component
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
       { selectedval ? selectedval : 'Select priority' } 
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

export default connect(mapStateToProps)(Dropdown);