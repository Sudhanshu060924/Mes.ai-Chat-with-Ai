import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/UserSlice";


function Messagearea() {
  const { SelectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={`${SelectedUser?'flex':"hidden"} md:flex w-full md:w-[75%] h-full bg-gray-300`}>
      {SelectedUser && (
        <div className="w-full h-20 flex items-center gap-4 justify-start rounded-b-[25px] bg-blue-400/80">
          <div
            onClick={() => dispatch(setSelectedUser(null))}
            className="cursor-pointer"
          >
            <IoArrowBackOutline className="text-2xl ml-4 " />
          </div>
          <div
            // onClick={() => navigate("/profile")}
            className="w-14 h-14 cursor-pointer border-gray-200  flex items-center justify-center border-2 rounded-full  overflow-hidden  "
          >
            <img
              src={SelectedUser?.image || "profile.png"}
              alt="profile"
              className=" rounded-full   mx-auto "
            />
          </div>
          <h1 className="text-lg">{SelectedUser?.name || "User"}</h1>
        </div>
      )}
      {!SelectedUser && (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-4xl text-black-600">
            Welcome to QuickChat 
          </h1>

          <h1 className="text-2xl text-gray-600">
            Select a chat to start messaging!
          </h1>
        </div>
      )}
    </div>
  );
}

export default Messagearea;
