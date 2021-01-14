import React, {useEffect, useState} from 'react';
import './App.css';
import SearchInput from './SearchInput'
import './styles.css';

export default function App() {
  const [info, setInfo] = useState({})
  const [text, setText] = useState('');
  
  useEffect(() => {
     if(text) {
       fetch(`https://kitsu.io/api/edge/anime?filter[text]=${text}&page[limit]=12`)
       .then((response) => response.json())
       .then((response) => {
         setInfo(response)
       })
     }
  }, [text])

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput 
        value={text} 
        onChange={(search) => setText(search)} />

        {info.data && (
          <ul className="animes-list">
            {info.data.map((anime) => (
              <li key={anime.id}>
                <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
                {anime.attributes.canonicalTitle}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

