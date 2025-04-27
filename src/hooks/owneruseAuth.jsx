import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { jwtDecode } from "jwt-decode";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const ownerlogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("ownertoken");
            localStorage.removeItem("ownerdetails");
            navigate("/userlogin");
        }
    };









/*
    const monitortokenexpiration = () => {
        const ownertoken = localStorage.getItem("ownertoken");

        try {
            const decodedtoken = jwtDecode(ownertoken);

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



    



    const fetchownerdetails = async () => {

        //if(!monitortokenexpiration()) return null;

        try{
  
          const response = await axios.get("http://localhost:3000/api/owneraccounts/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ownertoken")}`},
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

    return {/*monitortokenexpiration,*/fetchownerdetails, ownerlogout};






};


