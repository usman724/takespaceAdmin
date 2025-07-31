import { useLocalization } from '../../hooks/useLocalization';
import Button from '../ui/Button';

export default function ProfileInfoCard({ 
  profileData,
  onFollowMe,
  onAddFriend,
  onShareProfile
}) {
  const { t } = useLocalization();

  return (
    <div className="bg-white rounded-xl mx-auto w-full mb-6">
      {/* Profile Card */}
      <div 
        className="rounded-xl p-4 lg:p-6"
        style={{
          background: '#E3F3FF',
          borderRadius: '12px'
        }}
      >
        {/* User Info Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          {/* Profile Photo */}
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
          />

          {/* Name and Title */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              {profileData.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {profileData.title}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={onShareProfile}
              useCustomClasses={true}
              className="flex items-center justify-center"
              style={{
                width: '162px',
                height: '48px',
                padding: '12px 16px',
                gap: '8px',
                border: '1.5px solid #103358',
                borderRadius: '12px',
                background: 'transparent',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#103358'
              }}
            >
              {t('profile.profileInfo.followMe', 'Follow Me')}
            </Button>
            <Button
              onClick={onAddFriend}
              useCustomClasses={true}
              className="flex items-center justify-center"
              style={{
                width: '162px',
                height: '48px',
                padding: '12px 16px',
                gap: '8px',
                background: '#103358',
                border: '1.5px solid #103358',
                borderRadius: '12px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF'
              }}
            >
              {t('profile.profileInfo.addFriend', 'Add Friend')}
            </Button>
          </div>
        </div>

        {/* Profile Stats */}
        <div 
          className="pt-4"
          style={{
            borderTop: '1.07692px solid #FFFFFF'
          }}
        >
          <div className="flex justify-between items-center w-full gap-4">
            {/* Left Side - Join Date & Achievements */}
            <div className="flex items-center gap-3 flex-1 justify-start">
              <div 
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '45px',
                  height: '45px',
                  position: 'relative'
                }}
              >
                {/* Background Rectangle */}
                <div
                  style={{
                    position: 'absolute',
                    left: '4.44%',
                    right: '4.44%',
                    top: '4.44%',
                    bottom: '4.44%',
                    background: '#103358',
                    opacity: '0.1',
                    borderRadius: '8px'
                  }}
                />
                {/* Icon */}
                <img 
                  src="/icons/profile/join.svg" 
                  alt="Joined" 
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: 'calc(50% - 10px)',
                    top: 'calc(50% - 10px)',
                  }}
                />
              </div>
              
              <span 
                className="text-sm"
                style={{
                  fontFamily: 'Inter',
                  color: '#2C2646'
                }}
              >
                {t('profile.profileInfo.joined', 'Joined June 1, 2022')}
              </span>
              
              <div className="flex gap-1">
                <span>🔬</span>
                <span>📘</span>
                <span>🌍</span>
              </div>
              
              <span 
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#2C2646'
                }}
              >
                2+
              </span>
            </div>

            {/* Center - Following */}
            <div className="flex items-center gap-3 flex-1 justify-center">
              <div 
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '45px',
                  height: '45px',
                  position: 'relative'
                }}
              >
                {/* Background Rectangle */}
                <div
                  style={{
                    position: 'absolute',
                    left: '4.44%',
                    right: '4.44%',
                    top: '4.44%',
                    bottom: '4.44%',
                    background: '#103358',
                    opacity: '0.1',
                    borderRadius: '8px'
                  }}
                />
                {/* Icon */}
                <img 
                  src="/icons/feed/adduser.svg" 
                  alt="Following" 
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: 'calc(50% - 10px)',
                    top: 'calc(50% - 10px)',
                  }}
                />
              </div>
              
              <span 
                className="text-sm lg:ml-[14px]"
                style={{
                  fontFamily: 'Inter',
                  color: '#6B7280'
                }}
              >
                {t('profile.profileInfo.following', 'Following')}
              </span>
              
              <span 
              className='lg:ml-[50px]'
                style={{
                  fontFamily: 'DM Sans',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#398AC8'
                }}
              >
                {profileData.following}
              </span>
            </div>

            {/* Right Side - Followers */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div 
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '45px',
                  height: '45px',
                  position: 'relative'
                }}
              >
                {/* Background Rectangle */}
                <div
                  style={{
                    position: 'absolute',
                    left: '4.44%',
                    right: '4.44%',
                    top: '4.44%',
                    bottom: '4.44%',
                    background: '#103358',
                    opacity: '0.1',
                    borderRadius: '8px'
                  }}
                />
                {/* Icon */}
                <img 
                  src="/icons/profile/followers.svg" 
                  alt="Followers" 
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: 'calc(50% - 10px)',
                    top: 'calc(50% - 10px)',
                  }}
                />
              </div>
              
              <span 
                className="text-sm lg:ml-[14px]"
                style={{
                  fontFamily: 'Inter',
                  color: '#6B7280'
                }}
              >
                {t('profile.profileInfo.followers', 'Followers')}
              </span>
              
              <span 
              className='lg:ml-[50px]'
                style={{
                  fontFamily: 'DM Sans',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#398AC8'
                }}
              >
                {profileData.followers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}