import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  Icon: LucideIcon;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon }) => {
  return <Icon className="w-5 h-5" />;
};

export default IconWrapper;