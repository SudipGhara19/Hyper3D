import { toast } from "react-toastify";
import API from "./api";

export const upload3dFile = async (file, onProgress) => {
    const formData = new FormData();
    formData.append("modelFile", file);

    try {
        const response = await API.post(`/file/upload`, formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                onProgress(percentCompleted);  // Update progress state
            },
            headers: { "Content-Type": "multipart/form-data" }
        });
        if (response.status === 200) {
            return response.data;
        }

        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.error("Uploading model error:", error);

        const errorMsg = error.response?.data?.message || "Failed to upload 3D Model. Please try again.";
        toast.error(errorMsg);
        return { error: errorMsg };
    }
};
