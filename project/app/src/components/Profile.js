'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"
import axios from "axios"


const ProfilePage = () => {
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState({
    avatar: "",
    bio: "",
    username: "John Doe",
    numPosts: 0,
    numComments: 0,
    numReactions: 0,
  })

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUserProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    session && fetchUserProfile();
  }, [session]);


  // Function to handle file upload for avatar
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const res = await axios.post("/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        avatar: res.data.avatar,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBioChange = (event) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      bio: event.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put("/api/profile", userProfile);
      setUserProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    session?.user
      ? (
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar-container">
              <Image
                src={userProfile.avatar || "/default-avatar.png"}
                alt="Avatar"
                className="avatar-image"
                width={50}
                height={50}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="avatar-upload"
              />
            </div>
            <div className="username">{userProfile.username}</div>
          </div>
          <div className="bio">
            <textarea
              value={userProfile.bio}
              onChange={handleBioChange}
              placeholder="Write your bio..."
            />
          </div>
          <div>
            <button className=""
              onClick={handleSaveProfile}
            >Save</button>
          </div>
          <div className="statistics">
            <div className="statistic">
              <div className="stat-count">{userProfile.numPosts}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="statistic">
              <div className="stat-count">{userProfile.numComments}</div>
              <div className="stat-label">Comments</div>
            </div>
            <div className="statistic">
              <div className="stat-count">{userProfile.numReactions}</div>
              <div className="stat-label">Reactions</div>
            </div>
          </div>
        </div>
      )
      : (
        <div className="feed">
          <p>You are not logged in</p>
        </div>
      )
  )
}

export default ProfilePage;
