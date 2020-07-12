import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Typehead.css";

const Typehead = (props) => {
  const { suggestions } = props;
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');
  let suggestionsListComponent;

  const wrapperRef = useRef();

  useEffect(() => {
    //Outside click handler
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      //Avoid Memory Leak
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const suggestionListHandler = (e) => {
    const userInput = e.currentTarget.value ? e.currentTarget.value : e.target.value;
    // Filter our suggestions that don't start with user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = e => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        // User pressed the enter key
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filteredSuggestions[activeSuggestion]);
        break;
      case 38:
        // User pressed the up arrow
        if (activeSuggestion === 0) {
          return;
        }
        setActiveSuggestion(activeSuggestion - 1);
        break;
      case 40:
        // User pressed the down arrow
        if (activeSuggestion === 0) {
          return;
        }
        setActiveSuggestion(activeSuggestion + 1);
        break;
      case 27:
        //ESC Key
        setShowSuggestions(true);
        break;
      default:
      // Default Case 
    }
  };

  const handleClickOutside = (e) => {
    e.target.value && suggestionListHandler(e);
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let idx = (suggestion.toLowerCase()).indexOf((userInput.toLowerCase()));
            suggestion = [suggestion.substring(0, idx), <strong>{suggestion.substring(idx, idx + userInput.length)}</strong>, suggestion.substring(idx + userInput.length)];
            return (
              <li tabIndex={index} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>No Suggesstions!</em>
        </div>
      );
    }
  }
  return (
    <div className="search-container" ref={wrapperRef}>
      <input
        type="text"
        onChange={suggestionListHandler}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder="Search Colors"
      />
      {suggestionsListComponent}
    </div>
  );

}

Typehead.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
};

Typehead.defaultProps = {
  suggestions: []
};
export default Typehead;
