'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === "" || username === "") {
      toast.error("Please provide a username and a password")
      return
    }

    try {
      const res = await signIn('credentials', { username, password, redirect: false })

      //if there are no errors
      if (res?.error == null) {
        router.push("/feed")
      } else {
        toast.error("Failed to log in. Please try again later.")
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-container md:w-2/5 lg:w-2/5 sm:w-1/2">
      <p className="forum-title">Nature Forum</p>
      <h1 className="my-4 w-full text-xl font-light text-center">Log In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full mt-4" type="submit">Log in</button>
      </form>
      <Link href='/register' target="_blank">
        <p className=" mt-5 inline-flex items-center text-xs font-thin text-center">
          Don&apos;t have an account? <span> Register now!</span>
        </p>
      </Link>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </div>
  )
}
