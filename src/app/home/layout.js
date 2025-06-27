import MenuSuperior from "../components/shared/menuSuperior";
import CallInsurance from "../components/shared/callInsurance";

export default function LayoutHome({ children }) {
  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-screen-sm w-full">
        <MenuSuperior />
        <section className="mx-8 my-4">{children}</section>

        <div className="circulo rounded-full flex flex-col items-center justify-center">
          <CallInsurance />
        </div>
      </div>
    </div>
  );
}
