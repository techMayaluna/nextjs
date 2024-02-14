"use client";
import Link from "next/link";
import ActionSection from "./ActionSection";
import useUserStore from "@/app/stores/userStore";
import InsuranceButton from "./InsuranceButton";
import { useEffect } from "react";

import MisReportes from "./MisReportes";

export default function MisSeguros() {
  const { seguros, getSeguros, _id } = useUserStore((state) => state);

  useEffect(() => {
    getSeguros(_id);

    console.log(seguros);
  }, []);

  return (
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
              Aún no tienes seguros! Comunicate con nuestro equipo para adquirir
              uno.
            </p>
          )}
        </div>
      </section>
      <MisReportes seguros={seguros} />
    </>
  );
}
