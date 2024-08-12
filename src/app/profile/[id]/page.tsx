import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div className='flex flex-col font-bold gap-5 items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl'>Profile</h1>
      <span className='px-5 p-1 rounded text-xl text-white bg-black'>{params.id}</span>
    </div>
  )
}
