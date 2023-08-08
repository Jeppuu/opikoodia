'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('Plants')

  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p className="text-center text-2xl">Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !desc || !category) {
      toast.error("Please fill out all fields.")
      return
    }
    if (title.length < 4) {
      toast.error("Please provide a longer title.")
    }
    if (desc.length < 6) {
      toast.error("Please provide a longer text for the post.")
    }
    if (category === '') {
      toast.error('Please select a category for your post.')
    }

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify({ title, desc, category, authorId: session.user._id })
      })

      if (res.ok) {
        const post = await res.json();
        console.log(post);

        //redirect user to feed page
        router.push('/feed');
      } else {
        console.log("Error: " + res.statusText);
        throw new Error("Error occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="bg-bgRGBA shadow-md rounded-10 m-4 p-4 md:p-8 flex flex-col items-center justify-start sm:3/4 lg:w-1/2 h-screen">
      <p className="font-medium text-2xl text-brandGreen transition-colors duration-400 hover:text-brandGreenHover cursor-pointer">Nature Forum</p>
      <h1 className="my-4 w-full text-xl font-light text-center">What&apos;s on your mind?</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Give your post a title"
          className="bg-transparent my-4 w-full min-h-14 border-b-2 border-brandGreen p-2 pl-4 focus:outline-none" />
        <textarea rows="4" cols="50" onChange={(e) => setDesc(e.target.value)} placeholder="Write your post..."
          className="w-full px-4 py-2 bg-transparent text-base resize-none border-2 border-gray-300 rounded-md focus:outline-none focus:border-brandGreen" />
        <div className="relative inline-block w-full">
          <select onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full bg-transparent my-4  px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:brandGreen">
            <option value="">Select a category...</option>
            <option value="Plants">Plants</option>
            <option value="Trees">Trees</option>
            <option value="Flowers">Flowers</option>
            <option value="Animals">Animals</option>
            <option value="Fish">Fish</option>
            <option value="Insects">Insects</option>
            <option value="Phenomenons">Phenomenons</option>
            <option value="Stargazing">Stargazing</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="flex flex-row justify-evenly">
          <button className="w-1/2 mt-4 mx-2 bg-transparent text-center text-red min-h-14 rounded-lg md:p-1 border-2 border-red  transition duration-400 hover:bg-red hover:text-white"
            type="button" onClick={() => router.back()}>Cancel</button>
          <button className="w-1/2 mt-4 mx-2 bg-brandGreen text-center text-white min-h-14 rounded-lg p-2 md:p-1 transition duration-400 hover:bg-brandGreenHover"
            type="submit">Post to Forum</button>
        </div>
      </form>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </div>
  );
};

export default CreatePost;
