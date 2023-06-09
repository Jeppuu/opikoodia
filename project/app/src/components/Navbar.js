import Link from "next/link"
//import { ReactElement } from 'react'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Navbar() {
  return (
    <div className="nav">
      <p className="nav-title">Nature Forum</p>
      <ul className="page-links">
        <li>
          <Link href={"/"}>Main Feed</Link>
        </li>
        <li> <Link href={"/archive"}>Archive</Link>
        </li>
        <li><Link href={"/my-posts"}>My Posts</Link></li>
      </ul>
      <ul className="icon-links">
        <li>  <FontAwesomeIcon icon={faBell} className="fa-bell" /></li>
        <li><FontAwesomeIcon icon={faUser} /></li>
      </ul>
    </div>
  )
}
