import { useLocalization } from '../../hooks/useLocalization';
import BadgeCard from './BadgeCard';

export default function BadgesSection({ badges, onViewMore }) {
  const { t } = useLocalization();

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('profile.social.badges', 'Badges')}
        </h3>
        <button 
          onClick={onViewMore}
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '20px',
            lineHeight: '24px',
            color: '#103358',
            textTransform: 'capitalize'
          }}
          className="hover:opacity-80"
        >
          {t('profile.social.viewMoreBadges', 'View More Badges')}
        </button>
      </div>
      
      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
} 