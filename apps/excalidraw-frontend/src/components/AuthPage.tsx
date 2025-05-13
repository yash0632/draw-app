"use client"

import { useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function AuthPage({
    isSignin
}:{
    isSignin:boolean
}){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const router = useRouter();
    function sign(){
        if(isSignin){
            axios.post(`${BACKEND_URL}/user/signin`,{email,password}).then(response=>{
                const data = response.data;
                localStorage.setItem("token",data.token);

                router.push("/dashboard")
            })            
        }
        else{
            axios.post(`${BACKEND_URL}/user/register`,{email,password,username}).then(response=>{
                const data = response.data;
                localStorage.setItem("token",data.token);

                router.push("/dashboard")
            })
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <div className="p-2 m-2 rounded-md flex flex-col gap-y-2 border-[2px] border-neutral-200">
                <div className="mx-auto text-black text-xl font-semibold">{isSignin ? "Sign in":"Sign up"}</div>
                <div>                
                {!isSignin && <input className="p-2 m-2 rounded-md bg-neutral-500 " onChange={(e)=>setUsername(e.target.value)}  type="text" placeholder="username"/>}
                </div>
                <div >   
                    <input type="text" onChange={(e)=>setEmail(e.target.value)} className="p-2 m-2 rounded-md bg-neutral-500 " placeholder="email"/>
                </div>
                <div >
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="p-2 m-2 rounded-md bg-neutral-500 " placeholder="password"/>
                </div>
                
                <button className="p-2 m-2 rounded-md bg-neutral-500 cursor-pointer"  onClick={sign}>{isSignin ? "Sign in":"Sign up"}</button>
                {isSignin ? <Link className="underline text-center text-black" href="/signup">Sign Up</Link>:<Link className="underline text-center text-black" href="/signin">Sign In</Link>}
                
            </div>
        </div>
    )
}