import Cookies from "js-cookie";
import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => {
  return {
    geo: null,
    error: null,

    login: async (userid, password) => {
      try {
        const res = await axios.post("/api/auth/login", {
          identificacion: userid,
          password: password,
        });

        const cookieValue = {
          userId: res.data._id,
          ...(res.data.rol === "conductor" ? { placaConductor: userid } : {}),
        };
        Cookies.set("user", JSON.stringify(cookieValue));
        if (typeof window !== "undefined") {
          localStorage.setItem("userId", res.data._id);
        }
        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred");
      }
    },

    sendEmailForgotPass: async (email, code) => {
      try {
        const res = await axios.post("/api/auth/forgotpass", {
          email: email,
          code: code,
        });

        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred");
      }
    },

    changePassword: async (newPassword, idUser, email) => {
      try {
        const res = await axios.post("/api/auth/updatepass", {
          newPassword: newPassword,
          idUser: idUser,
          email: email,
        });

        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred");
      }
    },

    updateGeo: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            set({
              geo: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              error: null,
            });
          },
          (error) => {
            set({ error: "Geolocation permission denied" });
          }
        );
      } else {
        set({ error: "Geolocation is not supported by this browser." });
      }
    },
    logout: () => {
      Cookies.remove("user");
      if (typeof window !== "undefined") {
        localStorage.removeItem("userId");
      }
    },
  };
});

export default useUserStore;
