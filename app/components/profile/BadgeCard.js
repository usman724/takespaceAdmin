import { useLocalization } from '../../hooks/useLocalization';

export default function BadgeCard({ badge }) {
  const { t } = useLocalization();

  return (
    <div 
      className="relative rounded-xl p-4 text-center"
      style={{
        background: 'rgba(57, 138, 200, 0.1)',
        borderRadius: '10px',
        width: '100%',
        height: '289px'
      }}
    >
      {/* Badge Image Container */}
      <div className="relative w-full h-32 mb-4">
        <img
          src={badge.image || "/icons/badges/badge-placeholder.svg"}
          alt={badge.title}
          className="w-full h-full object-contain"
        />
        
       
        
     
      </div>

      {/* Badge Name */}
      <h4 
        className="mb-1"
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '16px',
          color: '#1E1E1E',
          textAlign: 'center'
        }}
      >
        {badge.title}
      </h4>

      {/* Badge Description */}
      <p 
        className="mb-4"
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '16px',
          color: '#1E1E1E',
          textAlign: 'center'
        }}
      >
        {badge.description}
      </p>

      {/* Progress Bar Container */}
      <div className="flex items-center justify-center gap-2">
        {/* Progress Bar */}
        <div 
          className="rounded-full"
          style={{
            width: '84px',
            height: '8px',
            background: '#E0E0E0',
            borderRadius: '20px'
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${(badge.progress / badge.total) * 100}%`,
              background: '#00A979'
            }}
          />
        </div>

        {/* Progress Text */}
        <span 
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '10px',
            lineHeight: '16px',
            color: '#000000'
          }}
        >
          {badge.progress}/{badge.total}
        </span>
      </div>
    </div>
  );
} 