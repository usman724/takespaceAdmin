import { useLocalization } from '../../hooks/useLocalization';
import { useRouter } from 'next/navigation';

export default function FriendSuggestions({ suggestions, onAddFriend }) {
  const { t } = useLocalization();
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl p-3 sm:p-4 lg:p-6"
      style={{
        border: '1px solid #D7D7D7',
        borderRadius: '12px'
      }}
    >
    
      <div className="space-y-3 sm:space-y-4">
        {suggestions.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Avatar */}
              <img
                src={friend.avatar}
                alt={friend.name}
                onClick={() => router.push(`/friend/${friend.id}`)}
                className="rounded-full object-cover flex-shrink-0 cursor-pointer hover:opacity-80"
                style={{
                  width: window.innerWidth < 640 ? '36px' : window.innerWidth < 1024 ? '42px' : '48px',
                  height: window.innerWidth < 640 ? '36px' : window.innerWidth < 1024 ? '42px' : '48px'
                }}
              />

              {/* User Info */}
              <div className="min-w-0 flex-1">
                <h4
                  onClick={() => router.push(`/friend/${friend.id}`)}
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    fontSize: window.innerWidth < 640 ? '12px' : '14px',
                    lineHeight: window.innerWidth < 640 ? '16px' : '20px',
                    letterSpacing: '-0.01em',
                    color: '#1D2026',
                    cursor: 'pointer'
                  }}
                  className="hover:text-blue-600"
                >
                  {friend.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    fontSize: window.innerWidth < 640 ? '10px' : '14px',
                    lineHeight: window.innerWidth < 640 ? '14px' : '22px',
                    letterSpacing: '-0.01em',
                    color: '#6E7485'
                  }}
                >
                  {friend.status}
                </p>
              </div>
            </div>

            {/* Add Friend Icon */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '30px',
                height: '30px'
              }}
            >
              <button
                onClick={() => onAddFriend(friend.id)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src="/icons/feed/adduser.svg"
                  alt="Add friend"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 