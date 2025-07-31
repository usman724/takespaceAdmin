'use client';
import Button from '../ui/Button';

export default function SubjectCard({ subject, onAction }) {
  const handleActionClick = () => {
    if (subject.hasProgress) {
      onAction(subject.id, 'start_practicing');
    } else {
      onAction(subject.id, 'set_goals');
    }
  };

  // Function to get random image based on subject
  const getRandomImage = (subjectName) => {
    const imageCategories = {
      'Biology': 'nature,dna,microscope,cells',
      'English Literature': 'books,library,writing,literature',
      'Science': 'science,laboratory,chemistry,physics',
      'Geography': 'maps,earth,geography,landscape',
      'Maths': 'mathematics,numbers,geometry,calculator'
    };
    
    const category = imageCategories[subjectName] || 'education,study';
    const randomSeed = Math.floor(Math.random() * 1000);
    
    // Using Unsplash API with specific categories
    return `https://source.unsplash.com/310x209/?${category}&${randomSeed}`;
  };

  const handleImageError = (e) => {
    // Fallback to a different random image service
    const fallbackCategories = {
      'Biology': 'biology',
      'English Literature': 'books',
      'Science': 'science',
      'Geography': 'geography',
      'Maths': 'mathematics'
    };
    
    const category = fallbackCategories[subject.name] || 'education';
    e.target.src = `https://picsum.photos/310/209?random=${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <div className="bg-white rounded-xl border border-[#DFDFDF] overflow-hidden hover:shadow-md transition-shadow relative w-full max-w-[338px] h-auto md:h-[358px]">
      {/* Subject Image */}
      <div className="relative w-full h-48 md:h-[209px] mx-2 mt-2 md:mx-[14px] md:mt-[14px]">
        <img
          src={subject.image || getRandomImage(subject.name)}
          alt={subject.name}
          className="w-[92%] h-full object-cover rounded-xl"
          onError={handleImageError}
        />
      </div>

      {/* Subject Content */}
      <div className="px-4 pb-4 md:px-6 md:pb-6">
        {/* Subject Name and Progress Row */}
        <div className="flex justify-between items-center mb-4 md:mb-6 mt-4 md:mt-5">
          <h3 
            className="text-xl md:text-[26px] font-semibold text-[#103358] leading-6 md:leading-5"
            style={{ 
              fontWeight: '600',
              color: '#103358'
            }}
          >
            {subject.name}
          </h3>
          
          {/* Progress percentage on the right side */}
          {subject.hasProgress && (
            <span 
              className="text-lg md:text-[22px] font-normal text-[#1F2024] ml-2"
              style={{
                fontSize: '22px',
                fontWeight: '400',
                lineHeight: '27px',
                color: '#1F2024'
              }}
            >
              {subject.progress}%
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <div className="px-2 md:px-0">
          <Button
            onClick={handleActionClick}
            useCustomClasses={true}
            className={`w-full md:w-[310px] h-11 md:h-[44px] rounded-xl flex items-center justify-center transition-all duration-200 ${
              subject.hasProgress 
                ? 'bg-[#103358] border-[1.5px] border-[#103358] text-white hover:bg-[#0a2544]' 
                : 'bg-transparent border-[1.5px] border-[#103358] text-[#103358] hover:bg-[#103358] hover:text-white'
            }`}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px 16px',
              gap: '8px',
              background: subject.hasProgress ? '#103358' : 'transparent',
              border: '1.5px solid #103358',
              borderRadius: '12px',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '20px',
              color: subject.hasProgress ? '#FFFFFF' : '#103358',
              cursor: 'pointer',
              width:"97%"
            }}
          >
            {subject.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}