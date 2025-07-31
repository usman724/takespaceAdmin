import { useLocalization } from '../../hooks/useLocalization';

export default function BlockUserModal({ isOpen, onClose, onBlock, userName }) {
  const { t } = useLocalization();

  if (!isOpen) return null;

  const handleBlock = () => {
    onBlock();
    onClose();
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
            {/* Block Icon */}
            <div className="mb-6 flex-shrink-0">
              <img
                src="/icons/profile/block.svg"
                alt="Block User"
                className="block"
                style={{
                  width: '113.3px',
                  height: '129px',
                  maxWidth: '100%',
                  height: 'auto'
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
                fontSize: 'clamp(20px, 5vw, 24px)',
                lineHeight: '1.3',
                color: '#0F172A',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Block this user?
            </h2>

            {/* Description */}
            <p 
              className="text-center mb-8 px-4"
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 'clamp(12px, 3vw, 14px)',
                lineHeight: '1.4',
                color: '#64748B',
                textAlign: 'center',
                width: '100%',
                maxWidth: '300px'
              }}
            >
              They won't be able to follow you or see your profile.
            </p>

            {/* Action Buttons */}
            <div className="w-full space-y-3 max-w-full">
              {/* Block Button */}
              <button
                onClick={handleBlock}
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
                  cursor: 'pointer'
                }}
              >
                Block
              </button>

              {/* Cancel Button */}
              <button
                onClick={onClose}
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
                  border: '1px solid #103358',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  lineHeight: '20px',
                  color: '#103358',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}