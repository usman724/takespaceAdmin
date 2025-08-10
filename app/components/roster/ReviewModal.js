'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ReviewModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  // Lock the page scroll while modal is open; keep hook order stable
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Early return AFTER hooks
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#10335833' }}
    >
      {/* Card */}
      <div
        className="relative"
        style={{
          position: 'absolute',
          width: 680,
          height: 502,
          left: 'calc(50% - 680px/2)',
          top: 'calc(50% - 502px/2 + 0.5px)',
          background: '#FFFFFF',
          boxShadow: '0px 0px 8px 2px rgba(9, 161, 218, 0.1)',
          borderRadius: 29.98,
          overflow: 'hidden'
        }}
      >
        {/* Title */}
        <div
          style={{
            position: 'absolute',
            width: 232,
            height: 24,
            left: 'calc(50% - 232px/2)',
            top: 39,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
          }}
        >
          <h3
            className="font-['Poppins']"
            style={{
              width: 232,
              height: 24,
              fontWeight: 500,
              fontSize: 30,
              lineHeight: '24px',
              color: '#103358',
              textAlign: 'center'
            }}
          >
            Review Needed
          </h3>
        </div>

        {/* Close button (top-right) */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            width: 19.55,
            height: 19.55,
            left: 643,
            top: 25,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid #292D32',
            background: '#fff'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Divider under heading */}
        <div
          style={{
            position: 'absolute',
            width: 605,
            height: 0,
            left: 38,
            top: 100,
            borderTop: '1px solid #D9E7EF'
          }}
        />

        {/* Description */}
        <p
          className="font-['Poppins']"
          style={{
            position: 'absolute',
            width: 605,
            height: 80,
            left: 'calc(50% - 605px/2 + 0.5px)',
            top: 144,
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '20px',
            textAlign: 'center',
            color: '#4F4F4F'
          }}
        >
          We&apos;ve identified issues in your student, teacher or admin data.<br />
          To correct issues, please review them here, update your original files
          and return to the upload page.
        </p>

        {/* Three images row */}
        <div
          style={{
            position: 'absolute',
            width: 435,
            height: 91,
            left: 'calc(50% - 435px/2 + 0.5px)',
            top: 242,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 81
          }}
        >
          {/* REVIEW */}
          <div style={{ width: 91, height: 91, position: 'relative', textAlign: 'center' }}>
            <img  className='mt-[23px]' src="/roster/review1.svg" alt="Review" width={91} height={91} />
            <div
              className="font-['Poppins']"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: -28,
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '24px',
                textTransform: 'uppercase',
                color: '#103358'
              }}
            >
              REVIEW
            </div>
          </div>

          {/* UPDATE */}
          <div style={{ width: 91, height: 91, position: 'relative', textAlign: 'center' }}>
            <img src="/roster/review2.svg" alt="Update" width={91} height={91} />
            <div
              className="font-['Poppins']"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: -28,
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '24px',
                textTransform: 'uppercase',
                color: '#103358'
              }}
            >
              UPDATE
            </div>
          </div>

          {/* UPLOAD */}
          <div style={{ width: 91, height: 91, position: 'relative', textAlign: 'center' }}>
            <img className='mt-[23px]' src="/roster/review3.svg" alt="Upload" width={91} height={91} />
            <div
              className="font-['Poppins']"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: -28,
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '24px',
                textTransform: 'uppercase',
                color: '#103358'
              }}
            >
              UPLOAD
            </div>
          </div>
        </div>

        {/* CTA button (centered) */}
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 40,
            left: 'calc(50% - 120px/2 + 0.5px)',
            top: 418,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8
          }}
        >
          <button
            onClick={onClose}
            className="font-['Poppins']"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 37px',
              gap: 8,
              width: 120,
              height: 40,
              background: '#16375A',
              borderRadius: 8,
              letterSpacing: '0.5px',
              color: '#FFFFFF',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '24px'
            }}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;