import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})


// Intercept requests to add token and check expiry
API.interceptors.request.use((config) => {
    const storedData = localStorage.getItem("access_token");

    if (storedData) {
        const { token, expiryTime } = JSON.parse(storedData);

        if (Date.now() < expiryTime) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            localStorage.removeItem("access_token"); // Remove expired token
        }
    }

    return config;
});

// Response Interceptor (Handle 401 Unauthorized)
// API.interceptors.response.use(
//     (response) => response, // Return response as is
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem("access_token"); // Auto logout on 401
//             window.location.href = "/signin"; // Redirect to login
//         }
//         return Promise.reject(error);
//     }
// );


export default API;