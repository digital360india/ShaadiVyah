import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '+919084684360'; 
  const message = 'Hello! I would like to know more about your services.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Contact us on WhatsApp
    </a>
  );
};

export default WhatsAppButton;
