'use client'
import { useSession } from "next-auth/react"
import Toolbar from "./Toolbar"

export default function Archive() {
  const { data: session } = useSession()

  return (
    session?.user
      ? (
        <>
          <Toolbar />
          <div className="feed" >
            <p>Archived posts will show here</p>
          </div >
        </>
      )
      : (
        <p>You are not logged in</p>
      )

  )
}
