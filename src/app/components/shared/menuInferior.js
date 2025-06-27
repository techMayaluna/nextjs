import CallInsurance from "./callInsurance";

export default function MenuInferior() {
  return (
    <div className="fixed inset-x-0 bottom-2 mr-8 flex justify-end md:static md:mr-0">
      {/* <footer className="bg-secondary flex gap-1 sm:gap-2 items-center pl-2 max-w-screen-sm w-11/12 h-20 rounded-2xl">
        <NavAction href="/home"></NavAction>
        <NavAction href="/home/user"></NavAction>
        <LogoutButton />
      </footer> */}
      <CallInsurance />
    </div>
  );
}
