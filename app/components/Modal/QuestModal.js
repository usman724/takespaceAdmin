'use client';

import Button from "../ui/Button";

export default function QuestModal({ isOpen, onClose, type = 'nudge', xpAmount = 1332 }) {
  if (!isOpen) return null;

  const getRandomAvatar = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=john&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 " >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black"
        style={{ opacity: 0.7 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center  scale-[0.5] md:scale-[1.0]  "
        style={{
          width: '618px',
          height: '577px',
          background: '#FFFFFF',
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
          borderRadius: '16px'
        }}
      >
        {/* Content Container */}
        <div
          className="flex flex-col items-center lg:max-w-[618px] lg:h-[577px] lg:pt-[48px] lg:pr-[65px] lg:pb-[60px] lg:pl-[65px] scale-[0.8] md:scale-[1.0]"
        >

          {/* Paper plane icon - Add your SVG here */}
          <div className="mb-[41px]">
            <img className="width-[205px] height-[167px]" src="/icons/quests/wellcome.svg" />
          </div>

          {/* XP Amount for Gift Modal */}
          {type === 'gift' && (
            <h2
              className="font-semibold text-center mb-6"
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '30px',
                lineHeight: '40px',
                color: '#0F172A'
              }}
            >
              XP {xpAmount}
            </h2>
          )}

          {/* Welcome Title */}
          {type !== 'gift' && (
            <h2
              className="font-semibold text-center mb-8"
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '30px',
                lineHeight: '40px',
                color: '#0F172A'
              }}
            >
              Welcome John!
            </h2>
          )}
          {/* Message Bubble */}
          <div className="relative mb-8" style={{ width: '488.15px', height: '99px' }}>
            {/* Main Bubble Container */}
            <div
              className="absolute flex items-center text-white"
              style={{
                width: '409px',
                height: '99px',
                left: '0px',
                top: '0px',
                background: '#398AC8',
                borderRadius: '300px',
                padding: '24px'
              }}
            >
              {/* Icon */}
              <div className="mr-4" style={{ width: '50px', height: '50px' }}>
                {type === 'gift' ? (
                  <img
                    src="/icons/quests/gift.svg"
                    alt="Gift"
                    style={{ width: '42px', height: '50px' }}
                  />
                ) : (
                  <img
                    src="/icons/quests/thumb.svg"
                    alt="Thumbs up"
                    style={{ width: '42px', height: '50px' }}
                  />
                )}
              </div>

              {/* Message Text */}
              <div
                className="text-white"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  fontSize: '22px',
                  lineHeight: '25px',
                  flex: 1
                }}
              >
                Hi John, here's an XP boost for you!
              </div>
            </div>

            {/* Bubble Tail/Vector */}
            <div
              className="absolute"
              style={{
                width: '156.1px',
                height: '46.1px',
                left: '256.77px',
                top: '64.19px',
                background: '#398AC8',
                clipPath: 'polygon(0% 0%, 100% 50%, 16% 100%)',
                transform: 'rotate(172deg)'
              }}
            />

            {/* Avatar */}
            <div
              className="absolute"
              style={{
                width: '70px',
                height: '70px',
                left: '418px', // 409px + 8.28px margin
                top: '28.5px', // Centered vertically: (99 - 70) / 2
                borderRadius: '37.9924px',
                overflow: 'hidden'
              }}
            >
              <img
                src={getRandomAvatar()}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=John&background=398AC8&color=fff&size=70`;
                }}
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={onClose}
            useCustomClasses={true}
            className="w-full text-white font-semibold rounded-xl mt-[43px]"
            style={{
              width: '487px',
              height: '50px',
              background: '#103358',
              borderRadius: '12px',
              fontFamily: 'Inter',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '20px',
              color: '#FFFFFF',

            }}
          >
            Send to John
          </Button>
        </div>
      </div>
    </div>
  );
}