'use client';
import React, { useState } from 'react';

const defaultColors = ['#ED5565', '#FC6E51', '#FFCE54', '#2ECC71', '#5D9CEC', '#AC92EC'];

const Option = ({ backgroundImage, defaultColor, isActive, onClick }) => {
  const style = {};
  if (backgroundImage) {
    style['--optionBackground'] = `url(${backgroundImage})`;
  }
  if (defaultColor) {
    style['--defaultBackground'] = defaultColor;
  }
  return (
    <div
      className={`option ${isActive ? 'active' : ''}`}
      style={style}
      onClick={onClick}
    >
      <div className="shadow"></div>
    </div>
  );
};

const OptionsContainer = ({ images }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="options">
      {images.map((image, index) => {
        const defaultColor = defaultColors[index % defaultColors.length];
        return (
          <Option
            key={index}
            backgroundImage={image}
            defaultColor={defaultColor}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </div>
  );
};

const imageUrls = [
  'https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg',
  'https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg',
  'https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg',
  'https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg',
  'https://66.media.tumblr.com/f19901f50b79604839ca761cd6d74748/tumblr_o65rohhkQL1qho82wo1_1280.jpg',
];

const HorizontalStackCards = () => {
  return <OptionsContainer images={imageUrls} />;
};

export default HorizontalStackCards;