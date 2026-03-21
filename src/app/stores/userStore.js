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
          identificacion: res.data.identificacion,
          rol: res.data.rol,
          placaConductor: userid,
        };
        Cookies.set("user", JSON.stringify(cookieValue));
        return res.data;
      } catch (error) {
        throw new Error(error.response.data.message);
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
        throw new Error(error.response.data.message);
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
        throw new Error(error.response.data.message);
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
    },
  };
});

export default useUserStore;
