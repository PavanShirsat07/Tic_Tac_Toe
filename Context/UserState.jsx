import { createContext } from "react";
import { useState,useEffect } from "react";
// Create the context
const UserContext = createContext();

const UserProvider = (props) => {
  const  [username, setusername] = useState("")
  const  [Opponent,setOpponent]=useState("")
  const  [isLogin,setisLogin]=useState(false)
  useEffect(() => {
    console.log('User Name is:',username)
    console.log('Opponent Name is :',Opponent)
  }, [username,Opponent,setOpponent])
  
  return (
    <UserContext.Provider value={{username,setusername,Opponent,setOpponent,isLogin,setisLogin}}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
