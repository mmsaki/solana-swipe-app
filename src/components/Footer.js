// rfce
import React from 'react'
import "./Footer.css"
import { IconButton } from "@mui/material";

function Footer() {
  return (
    <div className='footer-box'>
    <div className='footer-buttons-container'>
      <IconButton className="footer-buttons">
        <img src='/cancel-button.svg' alt='cancel button' />
      </IconButton>
      <IconButton className="footer-buttons button-md">
        <img src='/bookmark-button.svg' alt='save button' />
      </IconButton>
      <IconButton className="footer-buttons button-md">
        <img src='/info-button.svg' alt='info button' />
      </IconButton>
      <IconButton className="footer-buttons">
        <img src='/love-button.svg' alt='like button' />
      </IconButton>
      </div>
    </div>
  );
}

export default Footer