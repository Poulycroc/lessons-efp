import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RedditFeed() {
  // Utilisation de la méthode useState pour stocker les données du feed
  const [feedData, setFeedData] = useState([]);

  // Comme on est suseptible d'attendre un moment avant l'arrivée des données que l'on a demandé
  // j'aimerais afficher un loader
  const [isLoading, setLoadingStatus] = useState(false);

  // Utilisation de la méthode useEffect pour effectuer une requête GET sur l'API Reddit et mettre à jour les données du feed
  useEffect(() => {
    // Je set le loading a true
    setLoadingStatus(true);

    // Effectue une requête GET sur l'API Reddit
    axios.get('https://www.reddit.com/r/popular.json')
      .then(response => {
        // Met à jour les données du feed avec les données récupérées de l'API Reddit
        setFeedData(response.data.data.children);

        // Quand le les donnée sont passée dans "feedData" on stop le loading
        setLoadingStatus(false);
      })
      .catch(error => console.log(error));
  }, []); // Le tableau vide en deuxième argument indique que useEffect ne doit être exécuté qu'une seule fois lors du montage du composant

  // Affichage des données du feed dans une liste
  return (
    <div>
      {isLoading 
        ? (<div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>)
        : (<ul>
            {feedData.map(item => (
              <li key={item.data.id}>
                <a href={`https://www.reddit.com${item.data.permalink}`} target="_blank" rel="noopener noreferrer">
                  {item.data.title}
                </a>
              </li>
            ))}
          </ul>)
      }
    </div>
  );
}

export default RedditFeed;
