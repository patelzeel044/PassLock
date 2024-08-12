'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {

    const router=useRouter()
    const [Data, setData] = useState('')

    const logout = async () => {
       try {
        await axios.get('/api/users/logout')
        toast.success('logout Successfully')
        router.push('/login')
       } catch (error:any) {
        console.log(error.message)
       }

    }

    const getUserDetails = async () => {
        try {

        const response = await axios.get('/api/users/profile')
            setData(response.data.data.username)

        } catch (error:any) {
         console.log(error.response.data)
        }
 
     }



  return (
    <div className='flex flex-col gap-3 font-bold items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl'>Profile Page</h1>
      <hr />
      <p className='text-2xl'>Profile</p>
      <h2 className='px-5 p-1 rounded text-xl text-white bg-black'>{Data.length === 0 ?"Nothing":<Link href={`/profile/${Data}`}>{Data}</Link>}</h2>
      <hr />

      <button
      onClick={logout}
      className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Logout
      </button>

      <button
      onClick={getUserDetails}
      className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Get User Details
      </button>

    </div>
  )
}
