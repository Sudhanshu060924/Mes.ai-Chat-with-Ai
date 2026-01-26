import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';
import { ServerURL } from '../main';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/UserSlice';
import { setotherUsers } from '../redux/UserSlice';
import { setSelectedUser } from '../redux/UserSlice';


function Sidebar() {
const {userData,otherUsers,SelectedUser} = useSelector((state) => state.user);
const [search,setsearch] = React.useState("false");
const dispatch = useDispatch();
const navigate = useNavigate();

const handlelogout = async()=>{
 try {
  let result = await axios.get(`${ServerURL}/api/auth/logout`,{withCredentials:true});
  dispatch(setUserData(null));
  dispatch(otherUsers(""));
  navigate('/login');

 }
 
 
 
catch (error) {
  console.log("Error logging out:", error);
 }
}
  return (
    <div className={`${!SelectedUser?"block":"hidden"}  md:block md:w-[25%] w-full h-full border-r-2 border-gray-500 bg-blue-300`}>
      <div
        onClick={handlelogout}
        className="h-15 w-15 bg-gray-300/40 rounded-full hover:bg-amber-50 absolute fixed bottom-4 left-0  ml-4  flex justify-center items-center text-3xl text-blue-600 cursor-pointer "
      >
        <RiLogoutCircleLine />
      </div>
      <div className="top_part bg-gra-400/50 w-full  h-[35%] overflow-hidden  rounded-b-[30%] pl-4 flex  justify-between items-center ">
        <div className="flex flex-col mb-5 w-full h-full py-6 gap-6 ">
          <div className="flex justify-evenly items-center ">
            <div>
              <h1 className=" text-2xl text-black font-semibold ">QuickChat</h1>
              <h1 className="text-2xl ">Hi, {userData.name}</h1>
            </div>
            <div
              onClick={() => navigate("/profile")}
              className="w-20 h-20 cursor-pointer border-gray-200 mr-5 flex items-center justify-center border-2 rounded-full  overflow-hidden  "
            >
              <img
                src={userData.image || "profile.png"}
                alt="profile"
                className=" rounded-full   mx-auto "
              />
            </div>
          </div>
          <div className="flex ">
            {!search && (
              <div
                onClick={() => setsearch(true)}
                className="p-4  flex items-center gap-4  border-gray-500"
              >
                <IoSearch className="cursor-pointer" />
              </div>
            )}

            {search && (
              <form className=" px-10 mt-4 mx-4 flex items-center gap-4 border-2 rounded-full  border-gray-500">
                <IoSearch className="" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 text-lg rounded-md outline-none"
                />
                <RxCross2
                  className="cursor-pointer text-gray-800 text-2xl"
                  onClick={() => setsearch(false)}
                />
              </form>
            )}
            {!search &&
              otherUsers?.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col items-center gap-2 mt-4  border-gray-500"
                >
                  <div className="w-12 h-12 border-gray-200  flex items-center justify-center border-2 rounded-full  overflow-hidden  ">
                    <img
                      src={user.image || "profile.png"}
                      alt="profile"
                      className=" rounded-full    mx-auto "
                    />
                  </div>
                  <h1 className="text-lg mr-2">{user.name}</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        {/* Additional sidebar content can go here */}
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="flex  mt-2 bg-blue-400/60 rounded-full mx-10 gap-4 px-4 py-1 hover:bg-blue-200 cursor-pointer items-center   border-gray-500"
          >
            <div className="w-12 h-12 border-gray-200  flex items-center justify-center border-2 rounded-full  overflow-hidden  ">
              <img
                src={user.image || "profile.png"}
                alt="profile"
                className=" rounded-full    mx-auto "
              />
            </div>
            <h1 className="text-lg">{user.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar
