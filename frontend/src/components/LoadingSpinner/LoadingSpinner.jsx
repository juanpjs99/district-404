const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#64748B] text-sm">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
