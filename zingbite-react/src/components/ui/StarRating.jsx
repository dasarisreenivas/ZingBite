import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ 
  rating = 0, 
  onRatingChange, 
  interactive = false, 
  size = 18 
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (val) => {
    if (interactive && onRatingChange) {
      onRatingChange(val);
    }
  };

  const handleMouseEnter = (val) => {
    if (interactive) {
      setHoverRating(val);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const currentDisplayRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= currentDisplayRating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '2px',
              cursor: interactive ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              transition: 'transform 0.15s ease'
            }}
            onMouseOver={(e) => {
              if (interactive) {
                e.currentTarget.style.transform = 'scale(1.2)';
              }
            }}
            onMouseOut={(e) => {
              if (interactive) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <Star
              size={size}
              fill={isFilled ? '#FFB800' : 'transparent'}
              color={isFilled ? '#FFB800' : 'var(--text-muted)'}
              style={{
                transition: 'fill 0.2s, color 0.2s',
                strokeWidth: isFilled ? 0 : 1.5
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
