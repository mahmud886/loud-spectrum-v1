import React from 'react';

const ConsentContent = () => {
  return (
    <div>
      <p>
        If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly
        for your expressed consent, or provide you with an opportunity to say no.
      </p>
      <br />
      <p>
        If after you opt-in, you change your mind, you may withdraw your consent at any time by contacting us at{' '}
        <a href="mailto:info@yourdomain.com" className="text-blue-600 underline">
          info@yourdomain.com
        </a>
        .
      </p>
    </div>
  );
};

export default ConsentContent;
