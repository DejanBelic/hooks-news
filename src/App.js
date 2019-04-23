import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);

  const getResults = async () => {
    const response = await axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks');
    setResults(response.data.hits);
  };

  useEffect(
       () => {
          getResults();
      },[]);

  return (
    <>
      {results.map(result => (
          <ul key={result.objectID}>
          <li ><a href={result.url}>{result.title}</a></li>
          </ul>
      ))}
    </>
  );
}

export default App;
