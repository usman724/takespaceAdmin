// Reusable Subject Display Card for Quests and Leaderboards
export default function SubjectDisplayCard({ subject, onClick, showArrow = true }) {
  const handleImageError = (e) => {
    // Fallback to a default image if the subject image fails to load
    e.target.src = "/icons/home/science.svg";
  };

  return (
    <div
      className="bg-white rounded-xl border border-[#DFDFDF] overflow-hidden hover:shadow-md transition-shadow relative w-full max-w-[338px] cursor-pointer"
      style={{ height: '300px' }}
      onClick={onClick}
    >
      {/* Subject Image */}
      <div className="relative w-full h-48 mx-2 mt-2">
        <img
          src={subject.image}
          alt={subject.name}
          className="w-[95%] h-full object-cover rounded-xl"
          onError={handleImageError}
        />
      </div>

      {/* Subject Content */}
      <div className="px-4 pb-4 mt-4">
        {/* Subject Name and Arrow */}
        <div className="flex justify-between items-center">
          <h3
            className="text-xl md:text-2xl font-semibold text-[#103358]"
            style={{
              fontWeight: '600',
              color: '#103358'
            }}
          >
            {subject.name}
          </h3>

          {/* Arrow Icon from SVG file - only show if showArrow is true */}
          {showArrow && (
            <div className="text-[#103358] ml-4">
              <img
                src="/icons/rightarrow.svg"
                alt="Arrow"
                className="w-8 h-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 