'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import Post from "./PostCard"
import Toolbar from "./Toolbar"
import Link from "next/link"

export async function fetchPosts() {
  const res = await fetch('/api/post', { cache: 'no-store' })

  return res.json()
}

export default async function Feed() {
  const { data: session } = useSession()

  const [postList, setPostList] = useState([]);

  const handleResolve = (resolvedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === resolvedPostId ? { ...post, resolved: true } : post
      )
    );
  };

  const posts = await fetchPosts()

  return (
    session?.user
      ? (
        <>
          <Toolbar />
          <div className="feed" >
            {posts?.length > 0 && <h2 className="text-center text-2xl tracking-wide leading-loose uppercase p-4">Explore and share your thoughts</h2>}
            {posts?.length > 0
              ? posts.map((post) => (
                <Post key={post._id} handleResolve={handleResolve} post={post} />
              )) : <h3>Loading posts...</h3>}
          </div >
        </>
      )
      : (
        <div className="feed">
          <p>You are not logged in</p>
        </div>
      )
  )
}
