import { useLocalization } from '../../hooks/useLocalization';

export default function GoodJobModal({ isOpen, onClose }) {
  const { t } = useLocalization();

  if (!isOpen) return null;

  const handleBackToHome = () => {
    onClose();
    // Navigate to home or wherever needed
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50"
        style={{
          background: '#000000',
          opacity: 0.7
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl relative max-w-full max-h-full overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '480px',
            minHeight: '400px',
            boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
            borderRadius: '16px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content Container */}
          <div 
            className="flex flex-col items-center px-6 py-8 md:px-12 md:py-12"
            style={{
              width: '100%',
              margin: '0 auto'
            }}
          >
            {/* League Icon - Green Gem */}
            <div className="mb-6 flex-shrink-0">
              <img
                src="/icons/leaderboard/7.svg"
                alt="League Badge"
                className="block"
                style={{
                  width: '120px',
                  height: '120px',
                  maxWidth: '100%'
                }}
              />
            </div>

            {/* Title */}
            <h2 
              className="text-center mb-4 px-4"
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: 'clamp(24px, 5vw, 32px)',
                lineHeight: '1.3',
                color: '#0F172A',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Good Job!
            </h2>

            {/* Description */}
            <div className="text-center mb-8 px-4">
              <p 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  lineHeight: '1.4',
                  color: '#64748B',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                You finished #11 and keep your position in the
              </p>
              <p 
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  lineHeight: '1.4',
                  color: '#64748B',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Maestro League!
              </p>
            </div>

            {/* Back to Home Button */}
            <div className="w-full max-w-full">
              <button
                onClick={handleBackToHome}
                className="w-full"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 16px',
                  gap: '8px',
                  width: '100%',
                  maxWidth: '365px',
                  height: '50px',
                  background: '#103358',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  lineHeight: '20px',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0 auto'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}