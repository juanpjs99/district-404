export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_18px_rgba(59,130,246,.2)]",
    secondary: "border border-white/10 bg-white/5 hover:bg-white/10 text-white",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white",
    danger: "border border-red-400/20 bg-red-500/10 hover:bg-red-500/20 text-red-200",
    outline:
      "border border-blue-400/50 text-blue-300 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2
        rounded-lg
        font-medium
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}
