import React from 'react'
import "./Connected.css"
import Header from "./Header"
import Footer from "./Footer"
import TinderCards from "./TinderCards"

function Connected() {
  return (
    <div className="authed-container">
      {/* <form
          onSubmit={(event) => {
            event.preventDefault();
            sendGif();
          }}
        >
          <input
            type="text"
            placeholder="Enter GIF URL"
            value={inputValue}
            onChange={onInputChange}
          />
          <button type="submit" className="cta-button submit-gif-button">
            Submit
          </button>
        </form> */}
      <Header />
      <div>
        {/* map through gifList instead of TEST_GIFS.map((gif) => */}
        {
          // gifList.map((item, index) => (
          // <div className="gif-item" key={index}>
          //   {/* We use index as the key instead, also, the src is now item.gifLink */}
          //   <img src={item.gifLink} alt="gif" />
          //   <div className="gif-info">{item.userAddress.toString()}</div>
          // </div>
          // )
          // )
        }
        <TinderCards />
        <Footer />
      </div>
    </div>
  );
}

export default Connected