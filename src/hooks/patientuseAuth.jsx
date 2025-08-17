import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";









export const useAuth = () => {
    const navigate = useNavigate();



    

    const handlelogout = useCallback(() => {
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
            }
        } else {
            navigate("/userlogin");
        }
    }, [navigate]);




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




    



    const cacheRef = useRef({
        patientDetailsCache: null,
        lastFetchTime: 0
    });
    const CACHE_DURATION = 5000; // Cache for 5 seconds

    const fetchpatientdetails = useCallback(async () => {
        const now = Date.now();
        
        // Return cached data if it's still valid
        if (cacheRef.current.patientDetailsCache && 
            (now - cacheRef.current.lastFetchTime < CACHE_DURATION)) {
            return cacheRef.current.patientDetailsCache;
        }

        const token = localStorage.getItem("patienttoken");
        if (!token) {
            navigate("/userlogin");
            return null;
        }

        try {
            const response = await axios.get("/api/patientaccounts/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'max-age=5'
                }
            });
            
            // Update cache
            cacheRef.current.patientDetailsCache = response.data;
            cacheRef.current.lastFetchTime = now;
            
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                handlelogout();
            }
            console.error("Failed to fetch patient details:", error);
            return null;
        }
    }, [navigate, handlelogout]);








    const demographicCacheRef = useRef({});

    const fetchpatientdemographicbyemail = useCallback(async (email, force = false) => {
        const token = localStorage.getItem("patienttoken");
        const now = Date.now();
        
        // Check cache first
        if (!force && 
            demographicCacheRef.current[email]?.data && 
            demographicCacheRef.current[email]?.token === token && 
            now - demographicCacheRef.current[email]?.time < 300000) {
            return demographicCacheRef.current[email].data;
        }

        try {
            const response = await axios.get(
                `/api/patientdemographics/patientemail/${email}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'max-age=300'
                    }
                }
            );

            // Update cache only if data changed
            if (JSON.stringify(demographicCacheRef.current[email]?.data) !== JSON.stringify(response.data)) {
                demographicCacheRef.current[email] = {
                    data: response.data,
                    time: now,
                    token: token
                };
            }
            
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            if (error.response?.status === 401) {
                handlelogout();
            }
            console.error("Failed to fetch demographic data: ", error);
            return null;
        }
    }, [handlelogout]);


 



    


    







    useEffect(() => {
       /* monitortokenexpiration();
        const interval = setInterval(monitortokenexpiration, 60000);
        return () => clearInterval(interval);
      */



    },);

    return {/*monitortokenexpiration*/fetchpatientdetails, fetchpatientdemographicbyemail, handlelogout};






};


