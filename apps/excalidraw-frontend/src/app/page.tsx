"use client"
import {useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/config';

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      axios.post(`${BACKEND_URL}/user/verify`,{},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
        console.log(res)
        router.push(`/dashboard`)
      }).catch((err)=>{
        console.log(err)
        localStorage.removeItem("token")
        router.push("/signin")
      })
    }
    else{
      router.push("/signup")
    }
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Loading...
    </div>
  );
}
