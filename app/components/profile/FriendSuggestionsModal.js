import { useLocalization } from '../../hooks/useLocalization';

export default function FriendSuggestionsModal({ isOpen, onClose, suggestions }) {
  const { t } = useLocalization();

  if (!isOpen) return null;

  const handleAddFriend = () => {
    router.push('/search-friends');
  };

  const handleDismiss = (userId) => {
    console.log('Dismiss suggestion for user:', userId);
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
            maxWidth: '600px',
            minHeight: '400px',
            boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
            borderRadius: '16px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content Container */}
          <div 
            className="flex flex-col pt-[40px] pl-[70px] pb-[41px] pr-[71px]"
            style={{
              width: '100%',
              margin: '0 auto'
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 
                className="text-center mb-4"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '600',
                  fontSize: 'clamp(24px, 5vw, 32px)',
                  lineHeight: '1.3',
                  color: '#0F172A',
                  textAlign: 'center',
                  textTransform: 'capitalize'
                }}
              >
                Friend Suggestions
              </h2>
              <p 
                className="text-center px-4"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  lineHeight: '1.4',
                  color: '#64748B',
                  textAlign: 'center',
                  maxWidth: '342px',
                  margin: '0 auto'
                }}
              >
                They won't be able to follow you or see your profile.
              </p>
            </div>

            {/* Friend Suggestions List Container */}
            <div 
              className="flex flex-col mb-6"
              style={{
                width: '100%',
                maxWidth: '452px',
                maxHeight: '445px',
                background: '#FCFCFD',
                border: '1px solid #EAE9F0',
                borderRadius: '8px',
                padding: '15px 12px 17px',
                overflowY: 'auto'
              }}
            >
              <div className="space-y-0">
                {suggestions.map((suggestion, index) => (
                  <div key={suggestion.id}>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={suggestion.avatar}
                          alt={suggestion.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 
                            style={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: '600',
                              fontSize: window.innerWidth < 640 ? '14px' : '16px',
                              lineHeight: '1.4',
                              color: '#2C2646'
                            }}
                          >
                            {suggestion.name}
                          </h3>
                          <p 
                            style={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: '400',
                              fontSize: window.innerWidth < 640 ? '12px' : '14px',
                              lineHeight: '1.4',
                              color: '#6B7280'
                            }}
                          >
                            {suggestion.status}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Add Friend Button */}
                        <button
                          onClick={() => handleAddFriend(suggestion.id)}
                          className="flex items-center justify-center rounded"
                          style={{
                            width: '32px',
                            height: '32px',
                            
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                         <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9583 5.83333C14.1241 5.83333 14.2831 5.89918 14.4003 6.01639C14.5175 6.1336 14.5833 6.29257 14.5833 6.45833V7.5H15.625C15.7908 7.5 15.9497 7.56585 16.0669 7.68306C16.1842 7.80027 16.25 7.95924 16.25 8.125C16.25 8.29076 16.1842 8.44973 16.0669 8.56694C15.9497 8.68415 15.7908 8.75 15.625 8.75H14.5833V9.79167C14.5833 9.95743 14.5175 10.1164 14.4003 10.2336C14.2831 10.3508 14.1241 10.4167 13.9583 10.4167C13.7926 10.4167 13.6336 10.3508 13.5164 10.2336C13.3992 10.1164 13.3333 9.95743 13.3333 9.79167V8.75H12.2917C12.1259 8.75 11.9669 8.68415 11.8497 8.56694C11.7325 8.44973 11.6667 8.29076 11.6667 8.125C11.6667 7.95924 11.7325 7.80027 11.8497 7.68306C11.9669 7.56585 12.1259 7.5 12.2917 7.5H13.3333V6.45833C13.3333 6.29257 13.3992 6.1336 13.5164 6.01639C13.6336 5.89918 13.7926 5.83333 13.9583 5.83333ZM6.45833 1.25C4.9025 1.25 3.68083 2.46083 3.68083 3.90667C3.68083 5.3525 4.9025 6.56167 6.45833 6.56167C8.01417 6.56167 9.23583 5.35083 9.23583 3.905C9.23583 2.45917 8.01417 1.25 6.45833 1.25ZM2.43083 3.90667C2.43083 1.7275 4.25583 0 6.45833 0C8.66083 0 10.4858 1.7275 10.4858 3.90667C10.4858 6.08583 8.66083 7.8125 6.45833 7.8125C4.25583 7.8125 2.43083 6.085 2.43083 3.90583V3.90667ZM8.68083 10.5983C7.20939 10.3556 5.70811 10.3556 4.23667 10.5983L4.06333 10.6275C2.4575 10.8917 1.25 12.3317 1.25 14.0517C1.25 14.5942 1.67083 15 2.14833 15H10.7683C11.245 15 11.6667 14.5942 11.6667 14.0508C11.6667 12.3317 10.4592 10.8925 8.85333 10.6275L8.68083 10.5983ZM8.88333 9.365L9.05667 9.39417C11.295 9.76333 12.9167 11.7492 12.9167 14.0517C12.9167 15.2467 11.9742 16.25 10.7683 16.25H2.14833C0.9425 16.25 0 15.2467 0 14.0508C0 11.7492 1.62167 9.7625 3.86 9.39417L4.03333 9.365C5.63915 9.10012 7.27752 9.10012 8.88333 9.365Z" fill="#103358"/>
</svg>

                        </button>
                        
                        {/* Dismiss Button */}
                        <button
                          onClick={() => handleDismiss(suggestion.id)}
                          className="flex items-center justify-center rounded"
                          style={{
                            width: '32px',
                            height: '32px',
                            
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                         <img src="/icons/searchFriend/cross.svg" alt="cross" />

                        </button>
                      </div>
                    </div>

                    {/* Separator Line - Show for all items except the last one */}
                    {index < suggestions.length - 1 && (
                      <div
                        style={{
                          width: '100%',
                          height: '0px',
                          border: '1.07692px solid #F2F2F2'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
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
                maxWidth: '452px',
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
    </>
  );
}