'use client'

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    session?.user
      ? (
        <div className="relative bg-bgRGBA shadow-md w-full h-32 flex flex-row justify-between items-center">
          <Link href={"/"}>
            <p className="mx-4 font-medium lg:text-3xl md:text-2xl text-xl transition-colors delay-150 ease-in-out text-brandGreen hover:text-brandGreenHover"
            >Nature Forum</p></Link>
          <ul className="list-none flex flex-row mr-4 gap-7">
            <li className="font-normal md:text-lg text-base pb-3 transition duration-300 lg:hover:border-b-4 sm:hover:border-b-2 hover:border-brandGreen hover:pb-0">
              <Link href={"/feed"}>Main Feed</Link>
            </li >
            <li className="font-normal md:text-lg text-base pb-3 transition duration-300 lg:hover:border-b-4 sm:hover:border-b-2 hover:border-brandGreen hover:pb-0">
              <Link href={"/my-posts"}>My Posts</Link>
            </li>
          </ul>
          <ul className="list-none flex flex-row mr-4 gap-8">
            <li className="text-brandGreen lg:text-4xl text-3xl cursor-pointer transition duration-300 hover:text-brandGreenHover">
              <FontAwesomeIcon icon={faRightFromBracket} onClick={() => { signOut() }} />
            </li>
          </ul>

        </div>
      ) : (
        <div className="relative bg-bgRGBA shadow-md w-full h-32 flex flex-row justify-between items-center">
          <Link href={"/"}>
            <p className="nav-title mx-4 font-medium lg:text-3xl md:text-2xl sm:text-xl transition-colors delay-150 ease-in-out text-brandGreen hover:text-brandGreenHover">
              Nature Forum</p>
          </Link>
          <ul className="page-links"></ul>
          <ul className="icon-links"></ul>
          <ul className="list-none flex flex-row mr-4">
            <li className="block bg-brandGreen w-auto min-h-45 text-sm lg:text-base text-center text-white mx-4 px-6 py-2 rounded-full transition duration-300 hover:bg-brandGreenHover">
              <Link href="/login">Log in</Link>
            </li>
            <li className="block bg-transparent border-2 border-brandGreen w-auto min-h-45  text-sm lg:text-base text-center text-brandGreen mx-4 px-6 py-2 rounded-full transition duration-300 hover:bg-brandGreenHover hover:text-white hover:border-transparent">
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </div>
      )
  )
}
