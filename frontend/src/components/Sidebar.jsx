import React from 'react'
import { useSelector } from 'react-redux';

function Sidebar() {
const {userData} = useSelector((state) => state.user);
  return (
    <div className="w-full md:w-[25%] h-full border-r-2 border-gray-500 bg-gray-300">
      <div className="bg-gray-400/50 w-full h-[25%] rounded-b-[30%] pl-4 flex  justify-between items-center ">
        <div>
          <h1 className=" text-2xl text-black font-semibold ">
            Mes.ai
          </h1>
          <h1 className="text-2xl ">👋, {userData.name}</h1>
        </div>
        <div className="w-20 h-20 border-gray-200 flex items-center justify-center border-2 rounded-full  overflow-hidden  ">
          <img
            src={userData.image || "profile.png"}
            alt="profile"
            className=" rounded-full   mx-auto "
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Sidebar
