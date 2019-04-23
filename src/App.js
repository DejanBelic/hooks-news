import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query,setQuery] = useState('react hooks');

  const getResults = async () => {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults()
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
      />
      <button type="submit">Search</button>
      </form>
      {results.map(result => (
          <ul key={result.objectID}>
          <li ><a href={result.url}>{result.title}</a></li>
          </ul>
      ))}
    </>
  );
}

export default App;
