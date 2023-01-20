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
      name: "Elon.solana",
      url: "https://cdnwp-s3.benzinga.com/wp-content/uploads/2021/08/19150858/Screen-Shot-2021-08-19-at-3.08.50-PM.png",
    },
    {
      name: "Jeff.sol",
      url: "https://rndmcharacters-s3.s3.amazonaws.com/InvisibleFriends-roadmap/KITH_web.gif",
    },
    {
      name: "Yoggi",
      url: "https://www.nftfigure.org/wp-content/uploads/2022/05/yogies.gif",
    },
    {
      name: "Mark.eth",
      url: "https://media4.giphy.com/avatars/doodlesbyburnttoast/dMqxHmPPA8fd.gif",
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