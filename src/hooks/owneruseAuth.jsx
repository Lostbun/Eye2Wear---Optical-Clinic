import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const useAuth = () => {
    const navigate = useNavigate();



    

    const ownerlogout = useCallback(() => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("ownertoken");
            localStorage.removeItem("ownerdetails");
            localStorage.removeItem("currentuser");
            localStorage.removeItem("ownerclinic");
            localStorage.removeItem("ownername");
            localStorage.removeItem("owneremail");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/userlogin");
        }
    }, [navigate]);









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



    



    const cacheRef = useRef({
        ownerDetails: null,
        lastFetchTime: 0,
        lastToken: null
    });

    const fetchownerdetails = useCallback(async (force = false) => {
        const token = localStorage.getItem("ownertoken");
        const now = Date.now();
        
        // Check if we should use cached data
        if (!force && 
            cacheRef.current.ownerDetails && 
            token === cacheRef.current.lastToken && 
            now - cacheRef.current.lastFetchTime < 300000) { // Cache for 5 minutes
            return cacheRef.current.ownerDetails;
        }

        if (!token) {
            navigate("/userlogin");
            return null;
        }

        try {
            const response = await axios.get("/api/owneraccounts/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'max-age=300' // 5 minutes cache
                }
            });
            
            // Update cache only if the data is different
            if (JSON.stringify(cacheRef.current.ownerDetails) !== JSON.stringify(response.data)) {
                cacheRef.current.ownerDetails = response.data;
                cacheRef.current.lastFetchTime = now;
                cacheRef.current.lastToken = token;
            }
            
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                ownerlogout();
            }
            console.error("Failed to fetch owner details:", error);
            return null;
        }
    }, [navigate, ownerlogout]);



    






    useEffect(() => {

        
      //  monitortokenexpiration();
  //      const interval = setInterval(monitortokenexpiration, 60000);
//        return () => clearInterval(interval);
      



    },);

    return {/*monitortokenexpiration,*/fetchownerdetails, ownerlogout};






};


