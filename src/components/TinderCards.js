import { CastRounded } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import "./TinderCards.css"

function TinderCards() {
  // hooks are used to store data in react
  // they are functions that can be used in react components
  const [people, setPeople] = useState([
    {
      name: "Elon Musk",
      url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic4.businessinsider.com%2Fimage%2F51def664ecad04384c00000a%2Felon-musk-the-hyperloop-design-is-coming-august-12.jpg",
    },
    {
      name: "Jeff Bezos",
      url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.24.co.za%2Ffiles%2FCms%2FGeneral%2Fd%2F10008%2Fe625e8226a1a45429377995a0a966143.jpg",
    },
    {
      name: "Bill Gates",
      url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.techspot.com%2Fimages2%2Fnews%2Fbigimage%2F2020%2F03%2F2020-03-14-image-4.jpg",
    },
  ]);
  
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };


  return (
    <div className='card-container'>
      {people.map((people) => (
        <TinderCard
          className='swipe'
          key={people.name}
          preventSwipe={['up', 'down']}
        >
            <div className="card" style={{ backgroundImage: `url(${people.url})` }}>
            <h2>{people.name}</h2>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default TinderCards