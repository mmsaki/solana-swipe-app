const React = require("react");
import { useState, useMemo, useRef } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

const TinderCard = dynamic(() => import("react-tinder-card"), { ssr: false });

const styles = {
  cardContainer: `flex justify-center items-center bg-red-500 h-screen`,
  card: `relative vh-70 w-600 max-w-80vw p-20 border-radius-20 background-cover bg-center`,
  swipe: `bg-blue-200 absolute`,
};

const people = [
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
];

function TinderCards() {
  // hooks are used to store data in react
  // they are functions that can be used in react components
  // const {people} = useSWR();

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  const [currentIndex, setCurrentIndex] = useState(people.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(people.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = currentIndex < people.length - 1;
  const canSwipe = currentIndex >= 0;
  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < people.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="authed-container">
      <div className={styles.cardContainer}>
        {people.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={styles.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className={styles.card}
            >
              <h2>{character.name}</h2>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default TinderCards;