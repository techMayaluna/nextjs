import MenuSuperiorAdmin from "../components/menuSuperiorAdmin";

export default function LayoutAdmin({ children }) {
  return (
    <div className="flex flex-col justify-between h-screen mr-8 ml-8 mt-8">
        <MenuSuperiorAdmin/>
      {children}
    </div>
  );
}
