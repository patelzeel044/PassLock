'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {

    const [Verified, setVerified] = useState(false)
    const [token, setToken] = useState('')

    
    const verifyUserEmail = async () => {
       try {
         const response = await axios.post('/api/users/verifyemail', {token})
         setVerified(true)
         
       } catch (error:any) {
        console.log(error.response.data)
       }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken.toString() || "");
    }, [])
    
    useEffect(() => {
      if(token.length>0){
        verifyUserEmail()
      }
      }, [token])
      

  return (
    <div className="flex flex-col gap-3 items-center font-bold justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-black font-semibold text-white rounded">{token ? `${token}` : "no token"}</h2>

    {Verified && (
        <div className='flex flex-col items-center items-start'>
            <h2 className="text-2xl">Email Verified</h2>
            <Link
            className='bg-blue-500 mt-4 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
             href="/login">
                Login
            </Link>
        </div>
    )}
</div>
)
}

