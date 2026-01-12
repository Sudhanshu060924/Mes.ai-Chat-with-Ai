import React, { useRef } from 'react'
import { IoCameraOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerURL } from '../main';
import { setUserData } from '../redux/UserSlice';

function Profile() {
    const {userData}= useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = React.useState(userData?.name || '');
    const [frontendImage, setFrontendImage] = React.useState(userData?.image || "profile.png");
    const [backendImage, setBackendImage] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const image = useRef()
    const handleImage = ()=>{
      const file = image.current.files[0];
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
    const handleprofile = async (e)=>{
      e.preventDefault();
      setSaving(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        if(backendImage){
          formData.append("image", backendImage);
        }

        const result = await axios.put(`${ServerURL}/api/user/profile`, formData, {
          

          withCredentials: true,
        });
setSaving(false);
        dispatch(setUserData(result.data));
        
      } catch (error) {
        console.log("Error updating profile:", error);
        setSaving(false);
      }
    }
  return (
    <div className="w-full h-screen bg-gray-300 flex justify-center items-center">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer fixed top-[2vw] left-[5vw]"
      >
        <IoArrowBackOutline className="text-2xl " />
      </div>

      <div className="p-4 rounded-md flex flex-col justify-center items-center bg-white shadow-lg">
        <div
          onClick={() => image.current.click()}
          className="cursor-pointer rounded-full relative"
        >
          <div className="w-25 h-25 border-gray-200 flex items-center justify-center border-4 rounded-full  overflow-hidden  ">
            <img
              src={frontendImage}
              alt="profile"
              className=" rounded-full   mx-auto "
            />
          </div>

          <IoCameraOutline className="absolute bottom-2 left-18 text-2xl text-black" />
        </div>
        <div>
          <form
          onSubmit={handleprofile}
           className="w-full flex flex-col items-center justify-center max-w-sm mx-auto p-6  ">
            <input
              type="file"
              hidden
              accept="image/*"
              ref={image}
              onChange={handleImage}
            />

            <input
              type="text "
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="m-2 p-2 border-2 rounded-2xl border-gray-400 outline-none w-64"
            />
            <input
              type="email"
              value={userData?.email}
              readOnly
              className="m-2 p-2 border-2 text-gray-600 rounded-2xl border-gray-400 outline-none w-64"
            />
            <input
              type="text"
              value={userData?.userName}
              readOnly
              className="m-2 p-2 border-2 text-gray-600  rounded-2xl border-gray-400 outline-none w-64"
            />
            <button
              type="submit"
              disabled={saving}
              className="mt-4  bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {saving?'Saving...':'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile
