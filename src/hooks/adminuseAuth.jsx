import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { jwtDecode } from "jwt-decode";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const handlelogout = () => {

        if(localStorage.getItem("admintoken")){
            if (window.confirm("Are you sure you want to log out?")){
        
              localStorage.removeItem("admintoken");
              localStorage.removeItem("admindetails")
              navigate("/userlogin");
          
            }}else{
              navigate("/userlogin");
            }
        
    };









/*
    const monitortokenexpiration = () => {
        const admintoken = localStorage.getItem("admintoken");

        try {
            const decodedtoken = jwtDecode(admintoken);

            if(decodedtoken.exp * 1000 < Date.now()){

                handlelogout();
                return false;
            }
            
            return true;

        // eslint-disable-next-line no-unused-vars
        }catch(error){
            handlelogout();
            return false;
        }
    };



*/



    



    const fetchadmindetails = async () => {

        //if(!monitortokenexpiration()) return null;

        try{
  
          const response = await axios.get("http://localhost:3000/api/adminaccounts/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`},
          });

          return response.data;
  
        } catch (error) {
            console.error("Failed to fetch: ",error);
            return null;
        }
    };



    






    useEffect(() => {

        
      //  monitortokenexpiration();
  //      const interval = setInterval(monitortokenexpiration, 60000);
//        return () => clearInterval(interval);
      



    },);

    return {/*monitortokenexpiration,*/fetchadmindetails, handlelogout};






};


