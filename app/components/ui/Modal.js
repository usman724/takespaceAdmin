export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  className = '',
  overlayColor = '#000000',
  overlayOpacity = 0.5
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
      />
      <div className={`relative bg-white rounded-lg shadow-xl ${className}`}>
        {children}
      </div>
    </div>
  );
}