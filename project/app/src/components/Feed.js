'use client'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Post from "./PostCard"
import Toolbar from "./Toolbar"

export async function fetchPosts() {
  const res = await fetch('/api/post', { cache: 'no-store' })
  const posts = await res.json()
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation time
}

export default function Feed() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredPosts([]);
    } else {
      const filtered = posts.filter((post) =>
        post.category.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [filterText, posts]);

  const displayedPosts = filterText.trim() === "" ? posts : filteredPosts;

  return (
    session?.user
      ? (
        <>
          <Toolbar onFilterTextChange={setFilterText} />
          <div className="feed" >
            {displayedPosts.length === 0 ?
              (
                <h3 className="text-base flex justify-center items-center p-4"
                >No posts match this category.</h3>
              )
              : (
                displayedPosts.map((post) => (
                  <Post key={post._id} post={post} />
                ))
              )
            }
          </div >
        </>
      )
      : (
        <div className="feed">
          <p className="text-base flex justify-center items-center p-4"
          >Please log in to access the forum.</p>
        </div>
      )
  )
}
