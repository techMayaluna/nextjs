"use client";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "../../stores/userStore";
import Modal from "../shared/Modal";
import ImageUploader from "./ImageUploader";
import { reportDateFormat } from "../../utils/todayDay";
import { imageTitleConstants } from "./constants";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

function FormMandarEmail({ params }) {
  const doc = new jsPDF();

  const { tipo, placa } = params;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [missingImage, setMissingImage] = useState(false);

  const [images, setImages] = useState([null, null, null, null]);
  const imgR1 = useRef();
  const imgR2 = useRef();
  const imgR3 = useRef();
  const imgR4 = useRef();
  const inputRefs = [imgR1, imgR2, imgR3, imgR4];

  const [dataVaraible, setDataVariable] = useState({
    comoOcurrio: "",
    numeroHeridos: 1,
    nombreTestigo: "",
    numeroTestigo: "",
  });

  const { nombre, identificacion, email, celular, direccion, ciudad, geo } =
    useUserStore((state) => ({
      nombre: state.nombre,
      identificacion: state.identificacion,
      email: state.email,
      celular: state.celular,
      direccion: state.direccion,
      ciudad: state.ciudad,
      geo: state.geo,
    }));

  useEffect(() => {
    if (!tipo) {
      router.push("/home");
    }
  }, []);

  async function convertImagesToBase64() {
    const base64Images = await Promise.all(
      images.map(async (image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.readAsDataURL(image);
        });
      })
    );

    return base64Images;
  }

  async function generatePDF() {
    // Convert all images
    const base64Images = await convertImagesToBase64();

    // Table printing
    doc.text("REPORTE DE ACCIDENTALIDAD", 14, 20);
    doc.autoTable({
      startY: 25,
      head: [
        [
          {
            content: "INFORMACIÓN DEL USUARIO",
            colSpan: 6,
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: "##e3fcf7",
              textColor: "#fff",
            },
          },
        ],
      ],
      body: [
        [
          "Nombre",
          "Número de Identificación",
          "Correo Electrónico",
          "Número de Contacto",
          "Dirección de Residencia",
          "Ciudad",
        ],
        [
          `${nombre}`,
          `${identificacion}`,
          `${email}`,
          `${celular}`,
          `${direccion}`,
          `${ciudad}`,
        ],
      ],
    });

    // Accident Information
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 5,
      head: [
        [
          {
            content: "INFORMACIÓN DEL ACCIDENTE",
            colSpan: 4,
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: "#cee6fe",
              fontStyle: "bold",
              textColor: "#000000",
            },
          },
        ],
      ],
      body: [
        [
          "placa del vehiculo",
          "Fecha de Reporte",
          "Tipo de Accidente",
          "Ubicación",
          "Número de Heridos",
        ],
        [
          `${placa}`,
          `${reportDateFormat()}`,
          `${tipo}`,
          `${geo.latitude}, ${geo.longitude}`,
          `${
            dataVaraible.numeroHeridos !== 0
              ? dataVaraible.numeroHeridos
              : "N/A"
          }`,
        ],
        [
          {
            content: "¿Cómo ocurrió el Accidente?",
            colSpan: 4,
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: "#cee6fe",
              fontStyle: "bold",
              textColor: "#000000",
            },
          },
        ],
        [
          {
            content: `${
              dataVaraible.comoOcurrio ? dataVaraible.comoOcurrio : "N/A"
            }`,
            colSpan: 4,
            rowSpan: 1,
          },
        ],
      ],
    });

    // Witnesses Information
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 5,
      head: [
        [
          {
            content: "INFORMACIÓN DE LOS TESTIGOS",
            colSpan: 2,
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: "#cee6fe",
              fontStyle: "bold",
              textColor: "#000000",
            },
          },
        ],
      ],
      body: [
        ["Nombre", "Número de Contacto"],
        [
          `${dataVaraible.nombreTestigo ? dataVaraible.nombreTestigo : "N/A"}`,
          `${dataVaraible.numeroTestigo ? dataVaraible.numeroTestigo : "N/A"}`,
        ],
      ],
    });

    // Photos Information
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 5,
      head: [
        [
          {
            content: "FOTOS DEL ACCIDENTE",
            colSpan: 2,
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: "##e3fcf7",
              textColor: "#fff",
            },
          },
        ],
      ],
    });

    let prevY = doc.autoTable.previous.finalY;

    for (let i = 0; i < imageTitleConstants.length; i++) {
      if (prevY > doc.internal.pageSize.height - 10) {
        doc.addPage();
        prevY = 10;
      }
      doc.text(`${imageTitleConstants[i].title}:`, 14, prevY + 10);
      doc.addImage(base64Images[i], "JPEG", 20, prevY + 15, 50, 50);
      prevY += 75;
    }

    //    doc.save("reporte.pdf");

    const blob = new Blob([doc.output("blob")], { type: "application/pdf" });

    const formData = new FormData();
    formData.append("pdf", blob);

    // Envía el FormData al backend
    try {
      const res = await axios.post("/api/email2", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpen(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnyImageNull = images.some((image) => image === null);

    if (isAnyImageNull) {
      return setMissingImage(true);
    }
    setIsLoading(true);
    generatePDF().catch((error) => console.error(error));
  };

  const handleLoadImage = (index) => {
    inputRefs[index].current.click();
  };

  const handleImageChange = (file, index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataVariable((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-center uppercase font-bold	">Reporte {tipo}</h1>

          <h2 className="py-2 font-semibold		">Información del accidente</h2>

          <div className="flex flex-col justify-between bg-primary p-6 rounded-2xl text-sm">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              ¿Cómo sucedió el accidente?{" "}
              <span className="text-red-700">*</span>
            </label>
            <textarea
              type="text"
              name="comoOcurrio"
              value={dataVaraible.comoOcurrio}
              onChange={handleInputChange}
              className="appearance-none block w-full bg-white text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Descipción detallada"
              required
            />

            {tipo == "Agravado" ? (
              <>
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Número de heridos: <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  name="numeroHeridos"
                  onChange={handleInputChange}
                  min={1}
                  value={dataVaraible.numeroHeridos}
                  className="appearance-none block w-full bg-white text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Cantidad de heridos"
                  required
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <h2 className="pb-2 pt-4 font-semibold">Información de los testigos</h2>

        <div className="bg-primary p-6 rounded-2xl text-sm">
          <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre (opcional)
          </label>
          <input
            type="text"
            name="nombreTestigo"
            value={dataVaraible.nombreTestigo}
            onChange={handleInputChange}
            className="appearance-none block w-full bg-white text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Nombre del testigo"
          />

          <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Número de contacto (opcional)
          </label>
          <input
            type="tel"
            name="numeroTestigo"
            value={dataVaraible.numeroTestigo}
            onChange={handleInputChange}
            className="appearance-none block w-full bg-white text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Numero de contacto del testigo"
          />
        </div>

        <h2 className="pb-2 pt-4 font-semibold">Evidencias fotográficas</h2>
        <h3 className="pb-2 ">Adjunte 1 fotografía en cada sección.</h3>

        <div className="bg-primary p-6 rounded-2xl">
          {imageTitleConstants.map((item, index) => (
            <ImageUploader
              key={item.id}
              index={index}
              images={images}
              headerTitle={item.title}
              handleLoadImage={() => handleLoadImage(index)}
              handleImageChange={(file, index) =>
                handleImageChange(file, index)
              }
              inputRef={inputRefs[index]}
            />
          ))}
        </div>

        <div className="mt-4 text-end">
          <button
            className="shadow bg-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
            type="submit"
          >
            Reportar caso
          </button>
        </div>
      </form>

      {isOpen && <ModalTipo onClose={() => setIsOpen(false)} />}
      {isLoading && <ModalLoading />}
      {missingImage && (
        <ModalMissingImage onClose={() => setMissingImage(false)} />
      )}
    </>
  );
}

function ModalTipo() {
  const router = useRouter();

  const sendBack = () => {
    router.push("/home");
  };

  return (
    <Modal>
      <h3 className="text-md text-left font-bold mb-4">
        Reporte enviado exitosamente. Gracias por confiar en seguros Mayaluna
      </h3>
      <div className="text-right mt-5">
        <button
          className="bg-secondary w-24 text-white px-4 py-2 rounded-lg"
          onClick={sendBack}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
}

function ModalLoading() {
  return (
    <Modal>
      <h3 className="text-md text-left font-bold mb-4">Cargando</h3>
      En un momento tu solicitud será exitosa{" "}
    </Modal>
  );
}

function ModalMissingImage({ onClose }) {
  return (
    <Modal>
      <h3 className="text-md text-left font-bold mb-4">
        Es necesario que adjuntes todas las imagenes correspodientes
      </h3>

      <div className="flex justify-end">
        <button
          className="bg-secondary w-24 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
}

export default FormMandarEmail;
