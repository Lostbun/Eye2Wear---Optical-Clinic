import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const stafflogout = useCallback(() => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("stafftoken");
            localStorage.removeItem("staffdetails");
            localStorage.removeItem("currentuser");
            localStorage.removeItem("staffclinic");
            localStorage.removeItem("staffemail");
            localStorage.removeItem("staffname");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/userlogin");
        }
    }, [navigate]);








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



    



    const cacheRef = useRef({
        staffDetails: null,
        lastFetchTime: 0,
        lastToken: null
    });

    const fetchstaffdetails = useCallback(async (force = false) => {
        const token = localStorage.getItem("stafftoken");
        const now = Date.now();
        
        // Check if we should use cached data
        if (!force && 
            cacheRef.current.staffDetails && 
            token === cacheRef.current.lastToken && 
            now - cacheRef.current.lastFetchTime < 300000) { // Cache for 5 minutes
            return cacheRef.current.staffDetails;
        }

        if (!token) {
            navigate("/userlogin");
            return null;
        }

        try {
            const response = await axios.get("/api/staffaccounts/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'max-age=300' // 5 minutes cache
                }
            });
            
            // Update cache only if the data is different
            if (JSON.stringify(cacheRef.current.staffDetails) !== JSON.stringify(response.data)) {
                cacheRef.current.staffDetails = response.data;
                cacheRef.current.lastFetchTime = now;
                cacheRef.current.lastToken = token;
            }
            
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                stafflogout();
            }
            console.error("Failed to fetch staff details:", error);
            return null;
        }
    }, [navigate, stafflogout]);



    






    useEffect(() => {

        
      //  monitortokenexpiration();
  //      const interval = setInterval(monitortokenexpiration, 60000);
//        return () => clearInterval(interval);
      



    },);

    return {/*monitortokenexpiration,*/fetchstaffdetails, stafflogout};






};


