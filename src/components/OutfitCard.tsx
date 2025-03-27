
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Calendar, ThumbsUp, Eye } from 'lucide-react';

interface OutfitCardProps {
  id: string;
  image: string;
  name: string;
  day?: string;
  votes?: number;
  onClick?: () => void;
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  showVotes?: boolean;
}

const OutfitCard: React.FC<OutfitCardProps> = ({
  id,
  image,
  name,
  day,
  votes = 0,
  onClick,
  className,
  selectable = false,
  selected = false,
  showVotes = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl hover-lift",
        selectable ? "cursor-pointer" : "",
        selected ? "ring-2 ring-primary ring-offset-2" : "",
        className
      )}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isLoaded ? "img-loaded" : "img-loading"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-80"
        )} />
        
        {selected && (
          <div className="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ThumbsUp size={18} />
            </motion.div>
          </div>
        )}
        
        {day && (
          <div className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-xs font-medium flex items-center">
            <Calendar size={12} className="mr-1.5" />
            {day}
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium">{name}</h3>
          
          {showVotes && (
            <div className="flex items-center mt-2 text-white/90 text-sm">
              <ThumbsUp size={14} className="mr-1.5" />
              <span>{votes} votes</span>
            </div>
          )}
        </div>
        
        {selectable && (
          <motion.div 
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center"
            >
              <Eye size={16} className="mr-1.5" />
              Sélectionner
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OutfitCard;
