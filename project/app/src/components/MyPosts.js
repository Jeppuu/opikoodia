'use client'
import { useSession } from "next-auth/react"
import Toolbar from "./Toolbar"

export default function MyPosts() {
  const { data: session } = useSession()

  return (
    session?.user
      ? (
        <>
          <Toolbar />
          <div className="feed" >
            <p>My own posts will display here</p>
          </div >
        </>
      )
      : (
        <p>You are not logged in</p>
      )

  )
}
