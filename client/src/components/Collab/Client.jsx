import React from "react";
import Avatar from "react-avatar";

function Client({ username }) {
  return (
    <div style={{ marginTop: 20 }}>
      <Avatar name={username.toString()} size={50} round="14px" />
      <span>{username.toString()}</span>
    </div>
  );
}

export default Client;
