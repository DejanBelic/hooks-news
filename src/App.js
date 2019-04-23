import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query,setQuery] = useState('reacthooks');

  const getResults = async () => {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
  };

  useEffect(
       () => {
          getResults();
      },[query]);

  return (
    <>
      <input type="text" onChange={event => setQuery(event.target.value)}/>
      {results.map(result => (
          <ul key={result.objectID}>
          <li ><a href={result.url}>{result.title}</a></li>
          </ul>
      ))}
    </>
  );
}

export default App;
