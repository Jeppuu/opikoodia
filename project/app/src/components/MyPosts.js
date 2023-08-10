'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Post from "./PostCard";
import Toolbar from "./Toolbar";

export async function fetchPosts() {
  const res = await fetch('/api/post', { cache: 'no-store' });
  return res.json();
}

export default function UserPosts() {
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState([]);

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

  return (
    session?.user ? (
      <>
        <Toolbar />
        <div className="feed">
          {userPosts?.length > 0 && <h2 className="text-center text-2xl tracking-wide leading-loose uppercase p-4">Your own posts</h2>}
          {userPosts?.length > 0 ? (
            userPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))
          ) : (
            <h3>No posts to display.</h3>
          )}
        </div>
      </>
    ) : (
      <div className="feed">
        <p>You are not logged in</p>
      </div>
    )
  );
}

