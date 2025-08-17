import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUnifiedAuth = () => {
    const navigate = useNavigate();

    const userType = localStorage.getItem("stafftoken") ? "staff" :
                    localStorage.getItem("ownertoken") ? "owner" :
                    localStorage.getItem("admintoken") ? "admin" : null;

    const token = localStorage.getItem("stafftoken") || 
                 localStorage.getItem("ownertoken") || 
                 localStorage.getItem("admintoken");

    const logout = useCallback(() => {
        if (window.confirm("Are you sure you want to logout?")) {
            // Clear all tokens
            localStorage.removeItem("stafftoken");
            localStorage.removeItem("ownertoken");
            localStorage.removeItem("admintoken");
            
            // Clear all user details
            localStorage.removeItem("staffdetails");
            localStorage.removeItem("ownerdetails");
            localStorage.removeItem("admindetails");
            localStorage.removeItem("currentuser");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            
            // Clear specific user type details
            localStorage.removeItem("staffclinic");
            localStorage.removeItem("staffemail");
            localStorage.removeItem("staffname");
            localStorage.removeItem("ownername");
            localStorage.removeItem("adminname");

            navigate("/userlogin");
        }
    }, [navigate]);

    const fetchUserDetails = useCallback(async () => {
        if (!token) {
            navigate("/userlogin");
            return null;
        }

        try {
            let endpoint = "";
            switch (userType) {
                case "staff":
                    endpoint = "/api/staffaccounts/me";
                    break;
                case "owner":
                    endpoint = "/api/owneraccounts/me";
                    break;
                case "admin":
                    endpoint = "/api/adminaccounts/me";
                    break;
                default:
                    navigate("/userlogin");
                    return null;
            }

            const response = await axios.get(endpoint, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'max-age=300'  // Cache for 5 minutes
                }
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
            }
            console.error("Failed to fetch user details:", error);
            return null;
        }
    }, [token, userType, navigate, logout]);

    return {
        userType,
        token,
        logout,
        fetchUserDetails
    };
};
