const React = require("react");

import { data } from '../static/data'
import Layout from "../components/Layout";
import Stories from '../components/stories/Stories';
import HomeRightBar from '../components/HomeRightBar';
import FeedItem from '../components/feed/Item';
import { useGlobalState } from "../hooks";
import { useState, useRef, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import dynamic from "next/dynamic";

const TinderCard = dynamic(() => import("react-tinder-card"), { ssr: false });

import EditPostModal from '../components/modals/EditPostModal';
import CreatePostModal from '../components/modals/CreatePostModal';



export default function Home() {
  //SOLANA STUFF
  const { wallet, posts, createPost, updatePost } = useGlobalState();
  console.log("Do we have any posts 😁", posts?.length);

  // States to grab the post and open modals
  const [editPostModalOpen, setEditPostModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [currentEditPostID, setCurrentEditPostID] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(posts?.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  // Function to target which post is being edited
  const toggleEditPostModal = (value, postId, owner) => {
    setCurrentEditPostID(postId);

    setEditPostModalOpen(value);
  }

  const style = {
    container: `homepage-feed lg:mr-8 flex flex-col`,
    swipe: `absolute w-90vw h-70vh`,
    card: `relative rounded-lg`,
  };

  // Tinder functions start
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const childRefs = useMemo(
    async () =>
      Array(await posts?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [useGlobalState]
  );
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = async () => currentIndex < posts.length - 1;
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
    if (canSwipe && currentIndex < posts.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex]?.current.restoreCard();
  };

  // Tinder functions end

  const getBalanceUsingJSONRPC = async (address) => {
    const url = clusterApiUrl("devnet");
    console.log(url);
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }

        return json["result"]["value"];
      }).catch((error) => {
        throw error;
      });
  };

  return (
    <Layout setCreatePostModalOpen={setCreatePostModalOpen}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={style.container}>
        <Stories stories={data.stories} />

        <>
          {/* Render posts */}
          {posts
            ? posts.map((post, i) => (
                <TinderCard
                  className={style.swipe}
                  ref={posts[i]}
                  key={i}
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) => swiped(dir, post.name, i)}
                  onCardLeftScreen={() => outOfFrame(post.name, i)}
                >
                  <div
                    className={style.card}
                    style={{ backgroundImage: "url(" + post.url + ")" }}
                  >
                    <h2>{post.name}</h2>
                  </div>
                  <FeedItem
                    data={post}
                    key={i}
                    walletKey={wallet?.publicKey}
                    setEditPostModalOpen={setEditPostModalOpen}
                    toggleEditPostModal={toggleEditPostModal}
                  />
                </TinderCard>
              ))
            : "Loading..."}
          <div className="buttons">
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              left!
            </button>
            <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              right!
            </button>
          </div>
        </>
        <CreatePostModal
          createPost={createPost}
          createPostModalOpen={createPostModalOpen}
          setCreatePostModalOpen={setCreatePostModalOpen}
        />
        <EditPostModal
          updatePost={updatePost}
          editPostModalOpen={editPostModalOpen}
          setEditPostModalOpen={setEditPostModalOpen}
          currentEditPostID={currentEditPostID}
        />
      </div>
      <HomeRightBar data={data.suggestions} />
    </Layout>
  );
}
