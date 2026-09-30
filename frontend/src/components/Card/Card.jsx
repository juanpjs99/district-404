export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-blue-500/10
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}