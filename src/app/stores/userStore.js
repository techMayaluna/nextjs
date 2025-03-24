import Cookies from "js-cookie";
import { create } from "zustand";
import axios from "axios";
import { companiasSeguros } from "../utils/insuranceCompaniesList";

const useUserStore = create((set) => {
  const userCookie = Cookies.get("user");
  const storedUser = userCookie ? JSON.parse(userCookie) : null;

  return {
    _id: storedUser ? storedUser.userId : null,
    nombre: null,
    identificacion: storedUser ? storedUser.identificacion : null,
    email: null,
    celular: null,
    direccion: null,
    ciudad: null,
    rol: storedUser ? storedUser.rol : null,
    fechaNacimiento: null,
    fechaVencimientoLicencia: null,
    isActive: null,
    geo: null,
    error: null,
    documentos: null,
    tipoDocumento: null,
    tipoPersona: null,
    seguros: [],
    placaConductor: storedUser ? storedUser.placaConductor : null,

    updateUser: (userData) => {
      set((state) => {
        const updatedState = { ...state, ...userData };
        console.log(userData);
        Cookies.set("user", JSON.stringify(updatedState));
        return updatedState;
      });
    },
    login: async (userid, password) => {
      try {
        const res = await axios.post("/api/auth/login", {
          identificacion: userid,
          password: password,
        });
        console.log(res.data);
        set({
          nombre: res.data.nombre,
          identificacion: res.data.identificacion,
          rol: res.data.rol,
          ciudad: res.data.ciudad,
          direccion: res.data.direccion,
          celular: res.data.celular,
          fechaNacimiento: res.data.fechaNacimiento,
          fechaVencimientoLicencia: res.data.fechaVencimientoLicencia,
          isActive: res.data.isActive,
          email: res.data.email,
          _id: res.data._id,
          documentos: res.data.documentos,
          tipoDocumento: res.data.tipoDocumento,
          tipoPersona: res.data.tipoPersona,
          placaConductor: userid,
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

    getUser: async (id) => {
      try {
        const res = await axios.post("/api/user", {
          idUser: id,
        });

        set({
          nombre: res.data.nombre,
          identificacion: res.data.identificacion,
          ciudad: res.data.ciudad,
          direccion: res.data.direccion,
          celular: res.data.celular,
          fechaNacimiento: res.data.fechaNacimiento,
          fechaVencimientoLicencia: res.data.fechaVencimientoLicencia,
          isActive: res.data.isActive,
          email: res.data.email,
          _id: res.data._id,
          documentos: res.data.documentos,
          tipoDocumento: res.data.tipoDocumento,
          tipoPersona: res.data.tipoPersona,
        });
        return res;
      } catch (error) {
        console.error(error);
        throw new Error(error.response);
      }
    },

    getSeguros: async (idUser) => {
      try {
        const res = await axios.post("/api/get-seguros", {
          idUser: idUser,
        });
        let seguros = res.data;
        seguros = seguros.map((seguro) => {
          const companiaSeguro = companiasSeguros.find(
            (compania) => compania.nombre === seguro.companiaAseguradora
          );
          return {
            ...seguro,
            asistencia: companiaSeguro ? companiaSeguro.asistencia : undefined,
          };
        });
        set({ seguros: seguros });
        return seguros;
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
      set({ nombre: null, identificacion: null, rol: null, ciudad: null });
      Cookies.remove("user");
    },
  };
});

export default useUserStore;
