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
  const [filteredPosts, setFilteredPosts] = useState([])
  const posts = await fetchPosts()

  async function handleCategoryFilter(category) {
    const res = await fetch(`/api/filter`);
    const data = await res.json();
    setFilteredPosts(data);
  }

  return (
    session?.user
      ? (
        <>
          <Toolbar onCategoryFilter={handleCategoryFilter} />
          <div className="feed" >
            {filteredPosts?.length > 0 ? (
              filteredPosts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <h3>No posts match the selected category.</h3>
            )}
            {/*{posts?.length > 0 && <h2 className="text-center text-2xl tracking-wide leading-loose uppercase p-4">Explore and share your thoughts</h2>}
            {posts?.length > 0
              ? posts.map((post) => (
                <Post key={post._id} post={post} />
              )) : <h3>Loading posts...</h3>}*/}
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
