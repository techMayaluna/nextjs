
export function getDiaHoy() {
  return diasSemana[new Date().getDay()];
}

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

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
