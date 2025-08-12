import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { jwtDecode } from "jwt-decode";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const stafflogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("stafftoken");
            localStorage.removeItem("staffdetails");
            localStorage.removeItem("currentuser");
            localStorage.removeItem("staffclinic");
            localStorage.removeItem("staffemail");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/userlogin");
        }
    };








/*
    const monitortokenexpiration = () => {
        const stafftoken = localStorage.getItem("stafftoken");

        try {
            const decodedtoken = jwtDecode(stafftoken);

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



    



    const fetchstaffdetails = async () => {

        //if(!monitortokenexpiration()) return null;

        try{
  
          const response = await axios.get("http://localhost:3000/api/staffaccounts/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("stafftoken")}`},
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

    return {/*monitortokenexpiration,*/fetchstaffdetails, stafflogout};






};


