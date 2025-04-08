import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    feedback:[],
    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/user/login", { email, password }, { withCredentials: true });
            set({ loading: false, user: res.data });
            toast.success("Logged in Successfully");
        } catch (error) {
            set({ loading: false });
            console.error("Login Error:", error); 
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/user/logout", { withCredentials: true });
            set({ loading: false, user: null });
            toast.success("Logged out Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axiosInstance.get("/user/profile",{withCredentials: true});
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    },
    postFeedback: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/user/postFeedback", data, { withCredentials: true });
            set({ loading: false });
            toast.success("Feedback sent successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },
    getFeedback: async () => {
        try {
          set({ loading: true });
          const res = await axiosInstance.get("/user/getFeedback", { withCredentials: true });
          set({
            feedback: res.data,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error("Get Feedback Error:", error);
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to fetch feedback",
          });
          toast.error(error.response?.data?.message || "Failed to fetch feedback");
        }
      }
      
}));


