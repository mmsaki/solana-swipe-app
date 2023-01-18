import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import "./Header.css";
import { IconButton } from "@mui/material";

function Header() {
  return (
    <div className="header-box">
      <div className="status-bar"></div>
      <div className="header-container">
        <div className="header-left-items">
          <IconButton className="header-icon profile-image">
          <img src="/user-profile.svg" alt="profile icon" />
          </IconButton>
          </div>
        <div className="header-right-items">
          <IconButton className="header-icon">
            <img src="/header-favorite-button.svg" alt="favorite icon" />
          </IconButton>
          <IconButton className="header-icon">
            <img src="/header-save-button.svg" alt="flash icon" />
          </IconButton>

          <IconButton className="header-icon">
            <div className="chat-box">
              <img className="chat-icon" src="/chat-button-notification.svg" alt="chat icon" />
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
