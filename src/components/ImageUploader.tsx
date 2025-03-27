
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Only accept image files
    if (!file.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        setUploaded(true);
        onImageUpload(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "w-full rounded-xl h-64 flex flex-col items-center justify-center text-center p-6 transition-all duration-200 cursor-pointer border-2 border-dashed hover-lift",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border",
          uploaded 
            ? "border-green-500/50 bg-green-50 dark:bg-green-900/10" 
            : "",
          preview ? "relative overflow-hidden" : "",
          className
        )}
      >
        {preview ? (
          <>
            <img 
              src={preview} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-cover img-loading img-loaded"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-white text-primary p-2 rounded-full"
              >
                <CheckCircle size={32} className="text-green-500" />
              </motion.div>
              <button 
                onClick={clearImage} 
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 p-4 bg-secondary rounded-full text-primary">
              <Upload size={30} strokeWidth={1.5} />
            </div>
            <h3 className="font-medium text-lg mb-1">Déposez votre photo ici</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Glissez-déposez ou cliquez pour sélectionner une image
            </p>
            <div className="flex items-center mt-3 text-xs text-muted-foreground">
              <ImageIcon size={14} className="mr-1" />
              <span>JPG, PNG, GIF (max 10MB)</span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ImageUploader;
