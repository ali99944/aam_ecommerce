import React from 'react';

export const Placeholder = ({ type = 'text', className = '', ...props }) => {
  const baseClasses = "bg-gradient-to-r animate-pulse rounded";
  const colors = "from-[#D2EAE8] to-[#00998F]/20";
  
  const getTypeStyles = () => {
    switch (type) {
      case 'text':
        return 'h-4 w-full';
      case 'heading':
        return 'h-8 w-3/4';
      case 'button':
        return 'h-10 rounded-md';
      case 'sidebar':
        return 'h-full w-full rounded-lg';
      case 'breadcrumb':
        return 'h-6 w-48';
      case 'product-card':
        return 'flex flex-col space-y-4 p-4 border border-[#D2EAE8] rounded-lg';
      default:
        return 'h-4 w-full';
    }
  };

  if (type === 'product-card') {
    return (
      <div className={`${baseClasses} ${className}`} {...props}>
        <div className={`${baseClasses} ${colors} h-40 w-full mb-4 rounded-md`}></div>
        <div className={`${baseClasses} ${colors} h-6 w-3/4 mb-2`}></div>
        <div className={`${baseClasses} ${colors} h-4 w-full mb-2`}></div>
        <div className={`${baseClasses} ${colors} h-4 w-2/3 mb-4`}></div>
        <div className={`${baseClasses} ${colors} h-8 w-1/3 self-end rounded-md`}></div>
      </div>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${colors} ${getTypeStyles()} ${className}`}
      {...props}
    />
  );
};

