import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { searchLocations } from '../../services/api';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchDebounced = setTimeout(async () => {
      if (query.length > 2) {
        const locations = await searchLocations(query);
        setResults(locations);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(fetchDebounced);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location) => {
    onLocationSelect(location);
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className={`search-input-wrapper glass-panel ${isFocused ? 'focused' : ''}`}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="search-input"
        />
        
      </div>
      {isFocused && results.length > 0 && (
        <div className="search-results glass-panel">
          {results.map((loc) => (
            <div
              key={loc.id}
              className="search-result-item"
              onClick={() => handleSelect(loc)}
            >
              <span className="location-name">{loc.name}</span>
              <span className="location-details">
                {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
