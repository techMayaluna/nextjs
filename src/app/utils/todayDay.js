import axios from "axios";

export function getDiaHoy() {
  return diasSemana[new Date().getDay()];
}
const ciudades = [
  {
    nombre: "Bogotá",
    reglas: [
      {
        dia: "Lunes",
        placas: ["6", "7", "8", "9", "0"],
      },
      {
        dia: "Martes",
        placas: ["1", "2", "3", "4", "5"],
      },
      {
        dia: "Miércoles",
        placas: ["6", "7", "8", "9", "0"],
      },
      {
        dia: "Jueves",
        placas: ["1", "2", "3", "4", "5"],
      },
      {
        dia: "Viernes",
        placas: ["6", "7", "8", "9", "0"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },
  {
    nombre: "Medellín",
    reglas: [
      {
        dia: "Lunes",
        placas: ["7", "1"],
      },
      {
        dia: "Martes",
        placas: ["3", "0"],
      },
      {
        dia: "Miércoles",
        placas: ["4", "6"],
      },
      {
        dia: "Jueves",
        placas: ["5", "9"],
      },
      {
        dia: "Viernes",
        placas: ["8", "2"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },
  {
    nombre: "Cali",
    reglas: [
      {
        dia: "Lunes",
        placas: ["1", "2"],
      },
      {
        dia: "Martes",
        placas: ["3", "4"],
      },
      {
        dia: "Miércoles",
        placas: ["5", "6"],
      },
      {
        dia: "Jueves",
        placas: ["7", "8"],
      },
      {
        dia: "Viernes",
        placas: ["9", "0"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Armenia",
    reglas: [
      {
        dia: "Lunes",
        placas: ["5", "6"],
      },
      {
        dia: "Martes",
        placas: ["7", "8"],
      },
      {
        dia: "Miércoles",
        placas: ["9", "0"],
      },
      {
        dia: "Jueves",
        placas: ["1", "2"],
      },
      {
        dia: "Viernes",
        placas: ["3", "4"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Ipiales",
    reglas: [
      {
        dia: "Lunes",
        placas: "No aplica",
      },
      {
        dia: "Martes",
        placas: "No aplica",
      },
      {
        dia: "Miércoles",
        placas: "No aplica",
      },
      {
        dia: "Jueves",
        placas: "No aplica",
      },
      {
        dia: "Viernes",
        placas: "No aplica",
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Tulua",
    reglas: [
      {
        dia: "Lunes",
        placas: "No aplica",
      },
      {
        dia: "Martes",
        placas: "No aplica",
      },
      {
        dia: "Miércoles",
        placas: "No aplica",
      },
      {
        dia: "Jueves",
        placas: "No aplica",
      },
      {
        dia: "Viernes",
        placas: "No aplica",
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Pasto",
    reglas: [
      {
        dia: "Lunes",
        placas: ["0", "1"],
      },
      {
        dia: "Martes",
        placas: ["2", "3"],
      },
      {
        dia: "Miércoles",
        placas: ["4", "5"],
      },
      {
        dia: "Jueves",
        placas: ["6", "7"],
      },
      {
        dia: "Viernes",
        placas: ["8", "9"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Popayan",
    reglas: [
      {
        dia: "Lunes",
        placas: ["9", "0"],
      },
      {
        dia: "Martes",
        placas: ["1", "2"],
      },
      {
        dia: "Miércoles",
        placas: ["3", "4"],
      },
      {
        dia: "Jueves",
        placas: ["5", "6"],
      },
      {
        dia: "Viernes",
        placas: ["7", "8"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Ibagué",
    reglas: [
      {
        dia: "Lunes",
        placas: ["6", "7"],
      },
      {
        dia: "Martes",
        placas: ["8", "9"],
      },
      {
        dia: "Miércoles",
        placas: ["0", "1"],
      },
      {
        dia: "Jueves",
        placas: ["2", "3"],
      },
      {
        dia: "Viernes",
        placas: ["4", "5"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Pereira",
    reglas: [
      {
        dia: "Lunes",
        placas: ["0", "1"],
      },
      {
        dia: "Martes",
        placas: ["2", "3"],
      },
      {
        dia: "Miércoles",
        placas: ["4", "5"],
      },
      {
        dia: "Jueves",
        placas: ["6", "7"],
      },
      {
        dia: "Viernes",
        placas: ["8", "9"],
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Santander de Quilichao - Cauca",
    reglas: [
      {
        dia: "Lunes",
        placas: "No aplica",
      },
      {
        dia: "Martes",
        placas: "No aplica",
      },
      {
        dia: "Miércoles",
        placas: "No aplica",
      },
      {
        dia: "Jueves",
        placas: "No aplica",
      },
      {
        dia: "Viernes",
        placas: "No aplica",
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Morales - Cauca",
    reglas: [
      {
        dia: "Lunes",
        placas: "No aplica",
      },
      {
        dia: "Martes",
        placas: "No aplica",
      },
      {
        dia: "Miércoles",
        placas: "No aplica",
      },
      {
        dia: "Jueves",
        placas: "No aplica",
      },
      {
        dia: "Viernes",
        placas: "No aplica",
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },

  {
    nombre: "Caldono - Cauca",
    reglas: [
      {
        dia: "Lunes",
        placas: "No aplica",
      },
      {
        dia: "Martes",
        placas: "No aplica",
      },
      {
        dia: "Miércoles",
        placas: "No aplica",
      },
      {
        dia: "Jueves",
        placas: "No aplica",
      },
      {
        dia: "Viernes",
        placas: "No aplica",
      },
      {
        dia: "Sábado",
        placas: "No aplica",
      },
      {
        dia: "Domingo",
        placas: "No aplica",
      },
    ],
  },
];


const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
export function getPicoyPlaca() {
  return ciudades;
}

export function aplicaONo(city) {
  let picoyPlaca = getPicoyPlaca();
  let diaHoy = getDiaHoy();

  let aplica = picoyPlaca
    .find((ciudadArray) => ciudadArray.nombre === city)
    ?.reglas.find((regla) => regla.dia === diaHoy);

  if (!aplica) {
    return "No aplica";
  }

  return Array.isArray(aplica?.placas)
    ? aplica.placas.join("-")
    : aplica.placas;
}

export function reportDateFormat() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function generateCode() {
  const code = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join("");
  return Number(code);
}
const ruta = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUserData(userId) {
  const response = await fetch(`${ruta}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: userId }),
  });

  const data = await response.json();
  return data;
}

export async function fetchInsurance(userId) {
  console.log(userId);
  const res = await axios.post(`${ruta}/api/get-seguros`, {
    idUser: userId,
  });

  return res.data;
}
