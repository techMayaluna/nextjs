export default function InsuranceButton({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center bg-tertiary hover:bg-tertiaryHover w-20 h-20 p-1 text-white rounded-2xl text-sm"
    >
      <h2 className="text-sm text-center">{text}</h2>
    </div>
  );
}
