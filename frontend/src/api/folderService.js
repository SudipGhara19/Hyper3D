import { toast } from "react-toastify";
import API from "./api";


//--------------------------------- add new FOLDER -------------------------------
export const addFolder = async (folderName) => {
    try {
        const response = await API.post(`/folder/add`, { folderName: folderName });

        // If adding is successful, return response data
        if (response.status === 201) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("New Folder adding Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to add new folder. Please try again.";

        if (statusCode === 400) {
            toast.error(response?.data?.message || "Invalid folder name or folder already exists.");
            return { error: "Invalid folder name or folder already exists." };
        }

        if (statusCode === 404) {
            toast.error("User not found.");
            return { error: "User not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}


//--------------------------------- Delete FOLDER ----------------------------
export const deleteFolder = async (folderName) => {
    try {
        const response = await API.delete(`/folder/delete?folderName=${folderName}`);

        // If delete is successful, return response data
        if (response.status === 200) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Deleting folder Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to delete folder. Please try again.";

        if (statusCode === 400) {
            toast.error(response?.data?.message || "Invalid folder .");
            return { error: "Invalid folder name ." };
        }

        if (statusCode === 404) {
            toast.error("Folder or User not found.");
            return { error: "Folder or User not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}