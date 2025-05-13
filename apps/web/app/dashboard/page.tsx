"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function HomePage() {
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  
  let content: React.ReactNode = null;
  
    content = (
      <div>
        <input
          style={{
            padding: "10px",
          }}
          type="text"
          placeholder="Room Name"
          onChange={(e) => {
            setRoomSlug(e.target.value);
          }}
        ></input>
        <button
          style={{ padding: 10 }}
          onClick={() => {
            console.log(roomSlug);
            if (roomSlug) {
              console.log(roomSlug, "herer");
              router.push(`/room/${roomSlug}`,);
            }
          }}
        >
          {" "}
          Join Room{" "}
        </button>
      </div>
    );
  

  return <div>{content}</div>;
}
