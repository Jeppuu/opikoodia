'use client'

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { faPen, faTrash, faCircleUp, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"


//ctx or postId
const PostDetails = (ctx) => {
  const [postDetails, setPostDetails] = useState('')
  const [isReacted, setIsReacted] = useState(false)
  const [postReactions, setPostReactions] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])

  const [formattedTime, setFormattedTime] = useState('');

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const time = new Date(postDetails.createdAt).toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    setFormattedTime(time);
  }, [postDetails.createdAt]);

  useEffect(() => {
    const displayedCommentIds = new Set() //keep track of displayed comments
    async function fetchComments() {
      const res = await fetch(`/api/comment/${ctx.params.id}`, { cache: 'no-store' })
      const commentsData = await res.json()

      // Filter out comments that have already been displayed
      const newComments = commentsData.filter(comment => !displayedCommentIds.has(comment._id));

      setComments((prevComments) => [...prevComments, ...newComments])

      // Add new comment IDs to the displayed set
      newComments.forEach(comment => displayedCommentIds.add(comment._id));
    }
    //fetch comments initially
    fetchComments()

    // Set up polling interval
    const pollingInterval = setInterval(fetchComments, 3000); // Poll every 3 seconds

    // Clean up the interval when the component unmounts or when the dependency changes
    return () => {
      clearInterval(pollingInterval);
    };
  }, [ctx.params.id])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/post/${ctx.params.id}`, { cache: 'no-store' })
      const post = await res.json()

      setPostDetails(post)
      setIsReacted(post?.reactions?.includes(session?.user?._id))
      setPostReactions(post?.reactions?.length || 0)
    }
    session && fetchPosts()
  }, [ctx.params.id, session])

  const handleDelete = async () => {
    try {
      const confirmModal = confirm('Are you sure you want to delete this post?')

      if (confirmModal) {
        const res = await fetch(`/api/post/${ctx.params.id}`, {
          headers: {
            'Authorization': `Bearer ${session.user.accessToken}`
          },
          method: "DELETE"
        })

        if (res.ok) {
          router.push('/feed')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleReaction = async () => {
    try {
      const res = await fetch(`/api/post/${ctx.params.id}/reaction`, {
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        method: "PUT"
      })
      console.log(res);
      if (res.ok) {
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


  const addComment = async (newComment, commentText) => {
    try {
      const body = {
        postId: ctx.params.id,
        authorId: session?.user?._id,
        text: commentText,
      }

      const res = await fetch('/api/comment', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: "POST",
        body: JSON.stringify(body)
      })

      if (res.ok) {
        const newComment = await res.json()
        console.log('Commenting successful');
        console.log(newComment);
        setComments([newComment, ...comments]);

        // Clear the commentText after successfully adding the comment
        setCommentText('');
      }

    } catch (error) {
      console.log(error)
      toast.error('An error occured. Please try again later')
    }
  }

  return (
    <div className="bg-bgRGBA p-4 my-4 mx-auto rounded flex flex-col flex-wrap items-center justify-center md:w-2/3">
      <div className="top-bar flex flex-row my-2 items-center text-center w-full justify-between pb-2 border-b border-gray-200">
        <span className="inline-block p-2 rounded bg-brandGreen text-white text-xs font-medium ">{postDetails.category}</span>
        <p className="text-sm text-gray-400 pr-2 ml-auto">{formattedTime}</p>
        {
          //if the post has been made by the current user
          postDetails?.authorId?._id.toString() === session?.user?._id.toString()
            ? (
              <>
                <Link href={`/post/edit/${ctx.params.id}`} className="">
                  <FontAwesomeIcon icon={faPen} className="text-md mx-2 bg-transparent text-gray-300 hover:text-brandGreen" />
                </Link>
                <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="text-md ml-2 bg-transparent text-gray-300 hover:text-red" />
              </>
            )
            : (
              <>
                <p className="font-medium p-2">{postDetails?.authorId?.username}</p>
              </>
            )
        }
      </div>
      <div className="textContent flex flex-col flex-wrap w-full items-start justify-start px-4">
        <h2 className="text-2xl font-medium my-2 tracking-wide">{postDetails.title}</h2>
        <p className="mb-4 mt-2 text-base leading-relaxed">{postDetails.desc}</p>
      </div>
      <Image alt="post image" height={200} width={300} src={"/background.jpg"}
        className="pb-4 rounded" />
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full">
        <span className="mr-3 inline-flex items-center ml-auto leading-none text-md">
          {postReactions}{" "}{isReacted
            ? (<FontAwesomeIcon icon={faCircleUp} onClick={handleReaction} className="text-md ml-2 bg-transparent text-brandGreen cursor-pointer" />)
            : (<FontAwesomeIcon icon={faCircleUp} onClick={handleReaction} className="text-md ml-2 bg-transparent text-gray-300 cursor-pointer" />)}
        </span>
      </div>

      <div className="w-full flex flex-col items-start justify-start text-center">
        <CommentForm postId={ctx.params.id} authorId={session?.user?._id} addComment={addComment} />
        <CommentList comments={comments} setComments={setComments} />
      </div>
      <ToastContainer hideProgressBar={true} position="top-center" />
    </div>
  )
}

export default PostDetails
