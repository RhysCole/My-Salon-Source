import React from 'react';

interface ScrollingTextProps {
  text: string;
  maxLength: number;
  className?: string;
}

export const ScrollingText: React.FC<ScrollingTextProps> = ({ text, maxLength, className }) => {
  const needsScrolling = text.length > maxLength;

  if (!needsScrolling) {
    return <p className={className}>{text}</p>;
  }

  return (
    // The main container clips the content and holds the fade overlays
    <div className={`relative w-full overflow-hidden ${className}`}>
      
      {/* This is the new animating container */}
      <div className="animate-marquee">
        {/* The text is duplicated to create the seamless loop */}
        <p className="w-full flex-shrink-0 px-2">{text}</p>
        <p className="w-full flex-shrink-0 px-2" aria-hidden="true">{text}</p>
      </div>

      {/* The fade overlays remain the same */}
      <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-base-100 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-base-100 to-transparent z-10"></div>
    </div>
  );
};