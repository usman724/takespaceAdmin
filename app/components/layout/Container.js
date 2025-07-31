export default function Container({ children, className = '' }) {
  return (
    <div className={`min-h-screen bg-[#E3F3FF] ${className}`}>
      <div className="flex flex-col min-h-screen">
        {children}
        <div className="mt-auto h-[13px] bg-gradient-to-r from-[#398AC8] to-[#26476B]"></div>
      </div>
    </div>
  );
}