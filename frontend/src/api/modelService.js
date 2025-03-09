import { toast } from "react-toastify";
import API from "./api";

//------------------------ create New Model --------------------------
export const createModel = async (modelData) => {
    try {
        const response = await API.post(`/model/create`, modelData);

        // If adding is successful, return response data
        if (response.status === 201) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("New Model adding Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to add new model. Please try again.";

        if (statusCode === 400) {
            toast.error(response?.data?.message || "Invalid model name or folder or already exists.");
            return { error: "Invalid modal or folder name or already exists." };
        }

        if (statusCode === 404) {
            toast.error("Folder not found.");
            return { error: "Folder not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}

//--------------------------- delete model ----------------------------
export const deleteModel = async (slug) => {
    try {
        const response = await API.delete(`/model/delete?slug=${slug}`);

        // If delete is successful, return response data
        if (response.status === 200) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Deleting model Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to delete model. Please try again.";

        if (statusCode === 400) {
            toast.error(response?.data?.message || "Invalid model slug .");
            return { error: "Invalid model slug." };
        }

        if (statusCode === 404) {
            toast.error(response?.data?.message || "Model or User not found.");
            return { error: "Model or User not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}