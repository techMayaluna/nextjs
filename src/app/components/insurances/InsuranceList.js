"use client";

import useUserStore from "@/app/stores/userStore";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import "./styles.css";
import { companiasSeguros } from "@/app/utils/insuranceCompaniesList";

const InsuranceList = () => {
  const { seguros, getSeguros, _id } = useUserStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (!_id) {
      router.push("/login");
    }
    getSeguros(_id);
    console.log(seguros);
  }, []);

  return (
    <section className="bg-primary py-4 px-4 rounded-2xl">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="font-bold text-left">Seguro</th>
            <th className="font-bold text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {seguros.map((seguro, index) => (
            <tr
              key={seguro._id}
              className={index % 2 === 0 ? "" : "bg-gray-100"}
            >
              <td className="text-left">
                Poliza {seguro.nombrePoliza} <br />
                Tipo Poliza {seguro.tipoPoliza} <br />
                {seguro.placaVehiculo ? (
                  <p className="font-bold">
                    {seguro.placaVehiculo} <br />
                  </p>
                ) : (
                  ""
                )}
                Fecha Inicio{" "}
                {new Date(seguro.fechaInicial).toISOString().split("T")[0]}{" "}
                <br />
                Fecha Fin{" "}
                {new Date(seguro.fechaVencimiento).toISOString().split("T")[0]}
              </td>

              <td className="">
                <div className="flex gap-2">
                  <Link href={`/home/seguros/${seguro._id}`} key={seguro._id}>
                    <div className="flex justify-center items-center bg-secondary rounded-full h-5 w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                        />
                      </svg>
                    </div>
                  </Link>

                  <a
                    className="text-right underline"
                    href={
                      "" + seguro.asistencia?.length < 4
                        ? `tel:%23${seguro.asistencia}`
                        : `tel:${seguro.asistencia}`
                    }
                  >
                    <div className="flex justify-center items-center bg-yellowCall rounded-full h-5 w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default InsuranceList;
