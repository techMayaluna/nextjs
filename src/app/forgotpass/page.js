import { ForgotPasswordForm } from "../components/forgotPassword";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <section className="w-screen h-screen bg-gradient-to-t from-gradientGreen to-white">
      <Link href="/login">
        <Image
          className="mx-auto mb-14 mt-6"
          src="/logomayaluna.webp"
          width={180}
          height={180}
          alt="logoMayaluna"
        />
      </Link>

      <ForgotPasswordForm />
    </section>
  );
}
