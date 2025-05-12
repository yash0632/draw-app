"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "./config";

export default function HomePage() {
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  const [isLoggedIn, SetIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUpUser() {
    axios
      .post(`${BACKEND_URL}/user/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        const data = res.data;
        window.localStorage.setItem("token", data.token);
        SetIsLoggedIn(true);
    });
  }

  let content: React.ReactNode = null;
  if (isLoggedIn) {
    content = (
      <div>
        <input
          style={{
            padding: "10px",
          }}
          type="text"
          placeholder="Room Name"
          onChange={(e) => {
            setRoomSlug(e.target.value)
          }}
        ></input>
        <button
          style={{ padding: 10 }}
          onClick={() => {
            console.log(roomSlug);
            if(roomSlug){
              console.log(roomSlug, "herer");
              router.push(`/room/${roomSlug}`);
            }
          }}
        >
          {" "}
          Join Room{" "}
        </button>
      </div>
    );
  } else {
    content = (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <label htmlFor="username">username: </label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signUpUser}>SignUp User</button>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}
