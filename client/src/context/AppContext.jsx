import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/isAuthenticated', {withCredentials: true});
      if(data.success){
        setIsLoggedIn(true);
        getUserData();
      }else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getUserData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-user-data', {withCredentials: true});
      if(data.success){
        setUserData(data.userData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  }
  return(
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}