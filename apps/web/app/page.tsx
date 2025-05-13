"use client"
import {useState} from 'react'
import axios from 'axios'
import { BACKEND_URL } from './config';
import { useRouter } from 'next/navigation';
export default function Home(){
    const router = useRouter();

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
            router.push(`/dashboard`);
        });
    }

    return(
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
    )
}