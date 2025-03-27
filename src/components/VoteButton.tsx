
import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonProps {
  type: 'up' | 'down';
  onClick: () => void;
  className?: string;
  voted?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  type, 
  onClick, 
  className,
  voted = false
}) => {
  const isThumbsUp = type === 'up';
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full p-4 transition-all duration-200",
        isThumbsUp 
          ? voted 
            ? "bg-green-100 text-green-600" 
            : "bg-secondary hover:bg-green-100 hover:text-green-600" 
          : voted 
            ? "bg-red-100 text-red-600" 
            : "bg-secondary hover:bg-red-100 hover:text-red-600",
        className
      )}
    >
      {isThumbsUp ? (
        <ThumbsUp className={cn("h-6 w-6", voted ? "fill-green-600" : "")} />
      ) : (
        <ThumbsDown className={cn("h-6 w-6", voted ? "fill-red-600" : "")} />
      )}
    </motion.button>
  );
};

export default VoteButton;
