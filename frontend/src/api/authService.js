import { toast } from "react-toastify";
import API from "./api";


// ------------------------------- Signup -------------------------
export const signup = async (data) => {
    try {
        const response = await API.post("/auth/signup", data);

        if (response.status === 201) {
            return response.data;
        } else {
            toast.error("Unexpected response from server.");
            return { error: "Unexpected response. Please try again." };
        }
    } catch (error) {
        console.log("Signup Error:", error); //Log the full error object
        const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMsg); //Show error toast
        return { error: errorMsg };
    }
};


// ------------------------------- SignIn ----------------------------
export const signin = async (data) => {
    try {
        const response = await API.post("/auth/signin", data);

        // Only return response if status is 200
        if (response.status === 200) {
            return response.data;
        }

        // This block should never execute because errors are caught in `catch`
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Signin Error:", error); // Log the full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Signin failed. Please try again.";

        if (statusCode === 401) {
            return { error: "Invalid email or password" }; // Return error instead of response
        }
        if (statusCode === 400) {
            return { error: "User not found. Please register first." };
        }

        return { error: errorMsg };
    }
};