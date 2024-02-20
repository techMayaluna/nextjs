"use client";

import useUserStore from "@/app/stores/userStore";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import "./styles.css";

const InsuranceList = () => {
  const { seguros, getSeguros, _id } = useUserStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (!_id) {
      router.push("/login");
    }
    getSeguros(_id);
  }, []);

  return (
    <section className="bg-primary py-4 px-4 rounded-2xl">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="font-bold text-left">Seguro</th>
            <th className="font-bold text-left">Placa</th>
            <th className="font-bold text-left">Vencimiento</th>
            <th className="font-bold text-left">Ver más</th>
          </tr>
        </thead>
        <tbody>
          {seguros.map((seguro) => (
            <tr key={seguro._id}>
              <td className="text-left">{seguro.tipoPoliza}</td>
              <td className="text-left">
                {seguro.placaVehiculo ? seguro.placaVehiculo : "N/A"}
              </td>
              <td className="text-left">
                {new Date(seguro.fechaVencimiento).toISOString().split("T")[0]}
              </td>
              <td className="flex justify-center items-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default InsuranceList;
