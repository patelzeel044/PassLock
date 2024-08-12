"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignupPage() {
    const router = useRouter()

    const [User, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const [BtnDisabled, setBtnDisabled] = useState(true)
    const [Loading, setLoading] = useState(false)

    const submit = async()=>{
      try {
        setLoading(true)

        const response = await axios.post("/api/users/signup", User)

          router.push('/login')

      } catch (error:any) {

        console.error(error.response.data.error)
        toast.error(error.response.data.error)

      } finally{

        setLoading(false)
      }
    }

    useEffect(() => {
      if(User.email.length > 0 && User.username.length > 0 && User.password.length > 0){
        setBtnDisabled(false)
      }else{
        setBtnDisabled(true)
      }
    }, [User])
    


  return (
    <div className='flex flex-col font-bold items-center justify-center min-h-screen py-2'>
        <h1 className='text-3xl p-5'>{Loading ? "Loading..." : "SignUp"}</h1>
        <hr/>

        <label htmlFor='username'>UserName : </label>
        <input
         id='username'
         type="text"
         value={User.username}
         onChange={(e)=>setUser({...User, username : e.target.value})}
         placeholder='username'
         className="p-2 border border-gray-300 font-semibold rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          />

        <label htmlFor='email'>Email : </label>
        <input
         id='email'
         type="text"
         value={User.email}
         onChange={(e)=>setUser({...User, email : e.target.value})}
         placeholder='email'
         className="p-2 border border-gray-300 font-semibold rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          />
          
        <label htmlFor='password'>Password : </label>
        <input
         id='password'
         type="password"
         value={User.password}
         onChange={(e)=>setUser({...User, password : e.target.value})}
         placeholder='password'
         className="p-2 border border-gray-300 font-semibold rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          />

          <button
          onClick={submit}
          disabled={BtnDisabled}
          className='bg-blue-500 mt-4 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            SignUp
          </button>

          <div className='font-semibold py-1'>
            Already have an Account{' '}
          <Link href='/login'
          className='text-blue-700 hover:bg-blue-900 font-bold '>
            LogIn
          </Link>
          </div>
        
    </div>
  )
}
