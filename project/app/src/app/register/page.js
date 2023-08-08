'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || password === '') {
      toast.error("Please provide a username and a password")
      return
    }
    if (password.length < 8) {
      toast.error("Password is too short")
      return
    }
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      console.log(await res.json());

      if (res.ok) {
        toast.success("Register success!")
        setTimeout(() => {
          signIn()
        }, 1500)
        return
      } else {
        toast.error("Register failed. Please try again later.")
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-container md:w-2/5 lg:w-2/5 sm:w-1/2">
      <p className="forum-title">Nature Forum</p>
      <h1 className="my-4 w-full text-xl font-light text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full mt-4" type="submit">Register</button>
      </form>
      <Link href='/login' target="_blank">
        <p className=" mt-5 inline-flex items-center text-xs font-thin text-center">
          Already have an account? <span> Log in!</span>
        </p>
      </Link>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </div>

  )
}
