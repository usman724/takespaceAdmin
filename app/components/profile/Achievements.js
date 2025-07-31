import { useLocalization } from '../../hooks/useLocalization';

export default function Achievements({ achievements }) {
  const { t } = useLocalization();
  
  return (
    <div
      className="bg-white rounded-xl"
      style={{
        borderRadius: '12px'
      }}
    >
      <div className="space-y-3 sm:space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D7D7D7' }}>
              {/* Achievement Image - Top with margins */}
              <div className="w-full" style={{ paddingTop: '14px', paddingLeft: '17px', paddingRight: '17px' }}>
                <img
                  src="/icons/achivementbanner.svg"
                  alt={achievement.title}
                  className="w-full h-32 sm:h-36 lg:h-40 object-cover"
                  style={{ borderRadius: '12px' }}
                />
              </div>
              
              {/* Achievement Content - Bottom */}
              <div className="p-4 sm:p-5 lg:p-6">
                <h4
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '700',
                    fontSize: window.innerWidth < 640 ? '16px' : window.innerWidth < 1024 ? '18px' : '20px',
                    lineHeight: window.innerWidth < 640 ? '20px' : window.innerWidth < 1024 ? '22px' : '24px',
                    color: '#1D2026',
                    marginBottom: window.innerWidth < 640 ? '8px' : '12px'
                  }}
                >
                  {achievement.title}
                </h4>
                
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    fontSize: window.innerWidth < 640 ? '12px' : window.innerWidth < 1024 ? '14px' : '16px',
                    lineHeight: window.innerWidth < 640 ? '16px' : window.innerWidth < 1024 ? '18px' : '20px',
                    color: '#6E7485'
                  }}
                >
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}