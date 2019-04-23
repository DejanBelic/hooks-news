import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query,setQuery] = useState('react hooks');
  const [loading,setLoading] = useState(false);
  const searchInputRef = useRef();

  const getResults = async () => {
    setLoading(true);
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults()
  };

  const handleClearSearch = () => {
    setQuery("")
    searchInputRef.current.focus();
  };

  useEffect(
       () => {
          getResults();
      },[]);

  return (
    <>
      <form onSubmit={handleSearch}>
      <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
      />
      <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      {
        loading ? "Loading..." :
            results.map(result => (
                  <ul key={result.objectID}>
                    <li ><a href={result.url}>{result.title}</a></li>
                  </ul>
              ))
      }

    </>
  );
}

export default App;
