import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL } from "../main";
import { setUserData } from "../redux/UserSlice";


const usegetcurrentUser = () => {
    const dispatch = useDispatch();
    


    useEffect(()=>{
        const fetchCurrentUser = async () => {
        try {
            const result = await axios.get(`${ServerURL}/api/user/current`, { withCredentials: true });
            dispatch(setUserData(result.data));
        } catch (error) {
            console.log("Error fetching current user:", error);
            
        }
    }
        fetchCurrentUser();
    
    },[dispatch]);
}

export default usegetcurrentUser;