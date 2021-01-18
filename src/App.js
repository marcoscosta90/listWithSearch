import React, {useEffect, useState} from 'react';
import qs from 'qs';
import './App.css';
import SearchInput from './SearchInput'
import './styles.css';
import Pagination from './Pagination';

const LIMIT = 12;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(0);

  console.log(info);
  
  useEffect(() => {
     
     // setInfo({});
     const query = {
       page: {
         limit: LIMIT,
         offset,
       }
     };
     if(text) {
       query.filter = {
        text,
       }
     }
       fetch(`https://kitsu.io/api/edge/anime?${qs.stringify(query)}`)
       .then((response) => response.json())
       .then((response) => {
         setInfo(response)
       });
     
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput 
        value={text} 
        onChange={(search) => setText(search)} />
        {text && !info.data && (
          <span>Carregando...</span>
        )}
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
        {info.meta && (
          <Pagination 
            limit={LIMIT}
            total={info.meta.count} 
            offset={offset}
            setOffset={setOffset}
         />
         )}
    </div>
  );
}


