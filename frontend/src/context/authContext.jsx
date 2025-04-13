import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);

     useEffect(()=> {

          const token = localStorage.getItem('token')

          if(token){
               axios.get('http://localhost:5001/api/user/me',{
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
               }).then((res) => {
                    setUser(res.data.user)
               }).catch((err) => {
                    console.log("Error fetching user", err);
                    setUser(null);
               })
          }
     },[])

     return (
          <AuthContext.Provider value={{user, setUser}}>
               {children}
          </AuthContext.Provider>
     )
}

export const useAuth = () => useContext(AuthContext);