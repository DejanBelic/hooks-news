import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  useEffect(
      () => {
        axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
            .then(response => {
              setResults(response.data.hits);
            })
      },[]);

  return (
    <>
      {results.map(result => (
          <ul>
          <li key={result.objectID}><a href={result.url}>{result.title}</a></li>
          </ul>
      ))}
    </>
  );
}

export default App;
