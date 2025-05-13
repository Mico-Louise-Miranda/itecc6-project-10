import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f2]">
      <div className="mb-4">
        {/* Plant pot icon */}
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 10V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V10" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 10H3V8C3 6.9 3.9 6 5 6H19C20.1 6 21 6.9 21 8V10Z" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21V6" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 5C9.5 3.62 10.62 2.5 12 2.5C13.38 2.5 14.5 3.62 14.5 5V6H9.5V5Z" stroke="#2E2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" fill="#2E2E2E"/>
          <path d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z" fill="#2E2E2E"/>
        </svg>
      </div>
      <div className="w-24 h-0.5 bg-[#2E2E2E]"></div>
    </div>
  );
};

export default Loader; 