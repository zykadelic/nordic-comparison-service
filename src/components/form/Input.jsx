import { useState, useEffect } from 'react';
import fuzzysort from 'fuzzysort';
import { findKeyByValue } from '_src/utils/helpers';

const labels = {
  name: 'Your name',
  country: 'Your nationality',
};

const suggest = (searchTerm, options = {}) => {
  const results = fuzzysort.go(searchTerm, Object.values(options), { limit: 5 });
  const suggestions = {};
  results.map(result => {
    const key = findKeyByValue(options, result.target);
    suggestions[key] = result.target;
  });
  return suggestions;
}

const Input = ({ field, initialValue, changeHandler, options = {} }) => {
  const label = labels[field];
  if (!label) throw new Error(`Invalid Input field value: ${field}`);

  const hasOptions = !!Object.keys(options).length;
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(false);

  const handleFocus = () => {
    if (hasOptions && !!value) setShowSuggestions(true);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (hasOptions) setShowSuggestions(false);
      validateValue();
    }, 1);
  }

  const validateValue = () => {
    if (hasOptions) {
      setError(!!value && !Object.values(options).includes(value));
    } else {
      setError(false);
    }
  }

  useEffect(() => {
    if (hasOptions) {
      setSuggestions(suggest(value, options));
      setShowSuggestions(!!value);
    }
    changeHandler(value);
  }, [value]);

  return (
    <>
      <label>
        <span>{label}</span><br />
        <input
          name={field}
          value={value}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={hasOptions ? 'off' : 'on'}
          style={error ? { borderColor: 'red' } : {}}
        />
      </label>
      {hasOptions && (
        <ol className="suggestions">
          {showSuggestions && (
            !!Object.keys(suggestions).length ? (
              Object.keys(suggestions).map((key) => (
                <li
                  key={key}
                  onMouseDown={() => setValue(suggestions[key])}
                >
                  {suggestions[key]}
                </li>
              ))
            ) : (
              <li>No results 😲</li>
            )
          )}
        </ol>
      )}
    </>
  );
};

export default Input;
