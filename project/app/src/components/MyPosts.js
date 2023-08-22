'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Post from "./PostCard";
import Toolbar from "./Toolbar";

export async function fetchPosts() {
  const res = await fetch('/api/post', { cache: 'no-store' });
  const posts = await res.json()
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation time
}

export default function UserPosts() {
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState([]);
  const [filteredUserPosts, setFilteredUserPosts] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    async function fetchAndSetUserPosts() {
      if (session?.user?._id) {
        const posts = await fetchPosts();
        const userSpecificPosts = posts.filter(post => post.authorId._id === session.user._id);
        setUserPosts(userSpecificPosts);
      }
    }

    fetchAndSetUserPosts();
  }, [session]);

  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredUserPosts([]);
    } else {
      const filtered = userPosts.filter(post =>
        post.category.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredUserPosts(filtered);
    }
  }, [filterText, userPosts]);

  const displayedUserPosts = filterText.trim() === "" ? userPosts : filteredUserPosts;

  return (
    session?.user ? (
      <>
        <Toolbar onFilterTextChange={setFilterText} />
        <div className="feed">
          {displayedUserPosts?.length > 0 ? (
            displayedUserPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))
          ) : (
            <h3 className="text-base flex justify-center items-center p-4">
              {userPosts.length === 0
                ? "You haven't made any posts yet."
                : "No posts match this category"
              }
            </h3>
          )}
        </div>
      </>
    ) : (
      <div className="feed">
        <p className="text-base flex justify-center items-center p-4"
        >Please log in to access the forum.</p>
      </div>
    )
  );
}

