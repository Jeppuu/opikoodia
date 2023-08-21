'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = ({ post: { title, desc, reactions, category, authorId, _id, createdAt } }) => {
  const { data: session } = useSession()
  const [isReacted, setIsReacted] = useState(false)
  const [postReactions, setPostReactions] = useState(0)

  useEffect(() => {
    session && reactions && setIsReacted(reactions.includes(session?.user?._id))
    session && reactions && setPostReactions(reactions.length)
  }, [reactions, session])

  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const time = new Date(createdAt).toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    setFormattedTime(time);
  }, [createdAt]);

  const handleReaction = async () => {
    try {
      const res = await fetch(`/api/post/${_id}/reaction`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: 'PUT'
      })
      if (res.ok) {
        //toggle like if post is already liked by the user
        if (isReacted) {
          setIsReacted(prev => !prev)
          setPostReactions(prev => prev - 1)
        } else {
          setIsReacted(prev => !prev)
          setPostReactions(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-bgRGBA p-4 my-4 mx-auto rounded flex flex-col flex-wrap items-center justify-center md:w-2/3">
      <div className="top-bar flex flex-row my-2 items-center text-center w-full justify-between pb-2 border-b border-gray-200">
        <span className="inline-block p-2 rounded bg-brandGreen text-white text-xs font-medium ">{category}</span>
        <p className="text-sm text-gray-400 pr-2 ml-auto">{formattedTime}</p>
        <p className="font-medium p-2">{authorId.username}</p>
      </div>
      <div className="textContent flex flex-col flex-wrap w-full items-start justify-start px-4">
        <h2 className="text-2xl font-medium my-2 tracking-wide">{title}</h2>
        <p className="mb-4 mt-2 py-6 text-base leading-relaxed">{desc}</p>
      </div>

      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full">
        <Link href={`/post/${_id}`} className="inline-block border-b border-brandGreen text-brandGreen font-medium">
          See More
        </Link>
        <span className="mr-3 inline-flex items-center ml-auto leading-none text-md">
          {postReactions}{" "}{isReacted
            ? (<FontAwesomeIcon icon={faCircleUp} onClick={handleReaction} className="text-md ml-2 bg-transparent text-brandGreen" />)
            : (<FontAwesomeIcon icon={faCircleUp} onClick={handleReaction} className="text-md ml-2 bg-transparent text-gray-300" />)}
        </span>
      </div>
    </div>
  )
}


export default Post;
