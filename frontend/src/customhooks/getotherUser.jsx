import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL } from "../main";
import { setotherUsers, setUserData } from "../redux/UserSlice";

const getotheruser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchotherUser = async () => {
      try {
        const result = await axios.get(`${ServerURL}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setotherUsers(result.data));
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };
    fetchotherUser();
  }, [dispatch]);
};

export default getotheruser;
