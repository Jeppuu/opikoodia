'use client'

import { useState } from "react"
import Link from "next/link"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Toolbar({ onFilterTextChange }) {
  function handleFilterTextChange(event) {
    onFilterTextChange(event.target.value)
  }


  return (
    <div className="toolbar bg-bgRGBA w-95 flex flex-row items-center justify-between m-4 p-4 min-h-[80px] shadow-md rounded-[20px]">
      <input
        type="text"
        name="tag-input"
        placeholder="Filter posts by category"
        onChange={handleFilterTextChange}
        className="bg-transparent min-h[50px] border-b-2 border-brandGreen p-[10px] pl-[14px] w-[250px] focus:outline-none"
      />
      <Link href='/create-post'
        className="block bg-brandGreen py-[10px] px-[8px] text-center text-sm lg:text-base text-white w-[20%] min-h-[50px] rounded-[15px] transition duration-300 hover:bg-brandGreenHover">
        <FontAwesomeIcon icon={faPenToSquare} className="mr-[5px]" />New post</Link>
    </div>
  )
}
