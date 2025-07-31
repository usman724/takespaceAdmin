import { useLocalization } from '../../hooks/useLocalization';

export default function ShareProfileModal({ isOpen, onClose, profileName }) {
  const { t } = useLocalization();

  if (!isOpen) return null;

  const handleShare = (platform) => {
    console.log(`Sharing profile on ${platform}`);
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
            className="flex flex-col items-center pl-[48px] pt-[48px] pb-[48px] pr-[67px]"
            style={{
              width: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title */}
            <h2 
              className="text-center mb-8"
              style={{
                width: '100%',
                maxWidth: window.innerWidth < 640 ? '100%' : '367px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: window.innerWidth < 640 ? '24px' : '32px',
                lineHeight: window.innerWidth < 640 ? '32px' : '46px',
                textTransform: 'capitalize',
                color: '#0F172A',
                textAlign: 'left'
              }}
            >
              Check Out {profileName}'s<br />On Take Space!
            </h2>

            {/* Share Options */}
            <div className="w-full space-y-3 mb-6">
              {/* Gmail */}
              <button
                onClick={() => handleShare('Gmail')}
                className="relative flex items-center"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '365px',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/icons/sharedprofile/google.svg"
                  alt="Gmail"
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Gmail
                </span>
              </button>

              {/* Messages */}
              <button
                onClick={() => handleShare('Messages')}
                className="relative flex items-center"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '365px',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/icons/sharedprofile/messager.svg"
                  alt="Messages"
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Messages
                </span>
              </button>

              {/* Chats */}
              <button
                onClick={() => handleShare('Chats')}
                className="relative flex items-center"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '365px',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/icons/sharedprofile/messager.svg"
                  alt="Chats"
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Chats
                </span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('WhatsApp')}
                className="relative flex items-center"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '365px',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/icons/sharedprofile/whatsapp.svg"
                  alt="WhatsApp"
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Whatsapp
                </span>
              </button>
            </div>

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
                background: '#D2D2D2',
                borderRadius: '12px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}