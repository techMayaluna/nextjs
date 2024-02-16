"use client";
import Link from "next/link";
import ActionSection from "./ActionSection";
import useUserStore from "@/app/stores/userStore";
import InsuranceButton from "./InsuranceButton";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Toaster, toast } from "sonner";

import MisReportes from "./MisReportes";

function MisSeguros() {
  const { seguros, getSeguros, _id, rol, placaConductor } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    console.log(rol);
    getSeguros(_id).then(() => {
      console.log(seguros);
      if (rol !== "conductor") {
        const hoy = new Date();
        const diasAviso = 10; // Número de días antes del vencimiento para mostrar el aviso

        seguros.forEach((seguro) => {
          const fechaVencimiento = new Date(seguro.fechaVencimiento);
          const diasRestantes = Math.ceil(
            (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
          );

          console.log(diasRestantes);
          if (diasRestantes <= diasAviso) {
            toast.info(
              `El seguro de ${seguro.tipoPoliza} está a punto de vencer`
            );
          }
        });
      }
    });
  }, [rol]);

  return (
    <>
      {rol !== "conductor" ? (
        <>
          <section className="pt-6">
            <h2 className="mb-1">MIS SEGUROS</h2>

            <div className="flex justify-between bg-primary p-6 rounded-2xl text-sm">
              {seguros.length > 0 ? (
                <>
                  {seguros.slice(0, 2).map((seguro) => (
                    <Link href={`/home/seguros/${seguro._id}`} key={seguro._id}>
                      <InsuranceButton text={seguro.tipoPoliza} />
                    </Link>
                  ))}

                  <Link href="/home/seguros">
                    <ActionSection src="todos" text="Ver todos" />
                  </Link>
                </>
              ) : (
                <p className="text-md">
                  Aún no tienes seguros! Comunicate con nuestro equipo para
                  adquirir uno.
                </p>
              )}
            </div>
          </section>
        </>
      ) : null}

      {rol !== "Colectivo" ? (
        <MisReportes
          seguros={seguros}
          placaConductor={placaConductor}
          rol={rol}
        />
      ) : null}

      <Toaster position="top-center" duration="1500" />
    </>
  );
}

export default dynamic(() => Promise.resolve(MisSeguros), {
  ssr: false,
});
