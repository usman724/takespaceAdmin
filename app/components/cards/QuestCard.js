'use client';
import { useState } from 'react';

export default function QuestCard({ quest, onAction, type = 'quest' }) {
  const handleCardClick = () => {
    if (type === 'quest' && onAction) {
      onAction(quest.id, 'view_quest');
    }
  };

  // Function to get random avatar image
  const getRandomAvatar = (name) => {
    const seed = name ? name.toLowerCase().replace(/\s+/g, '') : 'default';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  };

  return (
    <div 
      className={`relative bg-white rounded-lg overflow-hidden ${type === 'quest' ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      style={{
        width: '329.57px',
        height: '329.24px',
        border: '1.46848px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8.81089px'
      }}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: '329.57px',
          height: '240.83px',
          background: quest.user === 'You' ? 'rgba(47, 128, 237, 0.05)' : 'rgba(39, 174, 96, 0.05)'
        }}
      >
        {/* Avatar */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: quest.user === 'You' ? '143.62px' : '146.85px',
            height: quest.user === 'You' ? '146.85px' : '146.85px',
            borderRadius: '73.4241px'
          }}
        >
          <img
            src={quest.avatar || getRandomAvatar(quest.user)}
            alt={quest.user}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${quest.user}&background=398AC8&color=fff&size=150`;
            }}
          />
        </div>

        {/* Arrow icon for quest cards */}
        {type === 'quest' && (
          <div className="absolute top-4 right-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div 
        className="flex flex-col items-start p-3"
        style={{
          padding: '11.7479px',
          gap: '5.87px',
          width: '329.57px',
          height: '89.37px'
        }}
      >
        {/* Title */}
        <div 
          className="text-center text-black"
          style={{
            width: '306.07px',
            height: '24px',
            fontFamily: 'Inter',
            fontWeight: '400',
            fontSize: '17.6218px',
            lineHeight: '23px'
          }}
        >
          {quest.user}
        </div>

        {/* Subtitle */}
        <div 
          className="text-center capitalize font-semibold"
          style={{
            width: '306.07px',
            height: '36px',
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: '23.4957px',
            lineHeight: '35px',
            color: quest.user === 'You' ? '#0A66C2' : '#219653'
          }}
        >
          {quest.topics} Topics
        </div>
      </div>

      {/* Button */}
      {quest.button && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction && onAction(quest.id, quest.button.action);
          }}
          className="absolute text-white font-medium rounded-xl flex items-center justify-center"
          style={{
            width: '330.23px',
            height: '52.87px',
            left: '0px',
            top: '349.95px',
            background: '#103358',
            border: '1.46848px solid #398AC8',
            borderRadius: '12px',
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: '22.0272px',
            lineHeight: '29px',
            letterSpacing: '-0.352436px'
          }}
        >
          {quest.button.icon && (
            <span className="mr-2">{quest.button.icon}</span>
          )}
          {quest.button.text}
        </button>
      )}
    </div>
  );
}