import { useEffect, useCallback  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";









export const useAuth = () => {
    const navigate = useNavigate();



    

    const handlelogout = () => {

        if(localStorage.getItem("patienttoken")){
            if (window.confirm("Are you sure you want to log out?")){
        
        localStorage.removeItem('patienttoken');
  localStorage.removeItem('patientdetails');
  localStorage.removeItem('patientid');
  localStorage.removeItem('patientemail');
  localStorage.removeItem('patientfirstname');
  localStorage.removeItem('patientlastname');
  localStorage.removeItem('patientname');
  localStorage.removeItem('role');
  localStorage.removeItem('token');
  navigate('/userlogin');
          
            }}else{
              navigate("/userlogin");
            }
        
    };




/*
    const monitortokenexpiration = () => {
        const patienttoken = localStorage.getItem("patienttoken");

        try {
            const decodedtoken = jwtDecode(patienttoken);

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




    



    const fetchpatientdetails = useCallback( async () => {

       /* if(!monitortokenexpiration()) return null;*/

        try{
  
          const response = await axios.get(`/api/patientaccounts/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("patienttoken")}`},
          });

          return response.data;
  
        } catch (error) {
            console.error("Failed to fetch: ",error);
            return null;
        }
    }, []);








    const fetchpatientdemographicbyemail = useCallback(async (email) => {
        try{
            const response = await axios.get(
                `/api/patientdemographics/patientemail/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("patienttoken")}`
                    }
                }
            );

            return response.data;
        
        }catch(error){
            if(error.response?.status === 404) {
                return null;
            }
            console.error("Failed to fetch demographic data: ", error);
            return null;
        }
    }, []);


 



    


    







    useEffect(() => {
       /* monitortokenexpiration();
        const interval = setInterval(monitortokenexpiration, 60000);
        return () => clearInterval(interval);
      */



    },);

    return {/*monitortokenexpiration*/fetchpatientdetails, fetchpatientdemographicbyemail, handlelogout};






};


