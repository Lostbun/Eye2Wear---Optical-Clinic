import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const adminlogout = useCallback(() => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("admintoken");
            localStorage.removeItem("admindetails");
            localStorage.removeItem("currentuser");
            navigate("/userlogin");
        }
    }, [navigate]);







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



    



    const cacheRef = useRef({
        adminDetails: null,
        lastFetchTime: 0,
        lastToken: null
    });

    const fetchadmindetails = useCallback(async (force = false) => {
        const token = localStorage.getItem("admintoken");
        const now = Date.now();
        
        // Check if we should use cached data
        if (!force && 
            cacheRef.current.adminDetails && 
            token === cacheRef.current.lastToken && 
            now - cacheRef.current.lastFetchTime < 300000) { // Cache for 5 minutes
            return cacheRef.current.adminDetails;
        }

        if (!token) {
            navigate("/userlogin");
            return null;
        }

        try {
            const response = await axios.get("/api/adminaccounts/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'max-age=300' // 5 minutes cache
                }
            });
            
            // Update cache only if the data is different
            if (JSON.stringify(cacheRef.current.adminDetails) !== JSON.stringify(response.data)) {
                cacheRef.current.adminDetails = response.data;
                cacheRef.current.lastFetchTime = now;
                cacheRef.current.lastToken = token;
            }
            
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                adminlogout();
            }
            console.error("Failed to fetch admin details:", error);
            return null;
        }
    }, [navigate, adminlogout]);



    






    useEffect(() => {

        
      //  monitortokenexpiration();
  //      const interval = setInterval(monitortokenexpiration, 60000);
//        return () => clearInterval(interval);
      



    },);

    return {/*monitortokenexpiration,*/fetchadmindetails, adminlogout};






};


