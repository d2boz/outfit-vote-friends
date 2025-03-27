
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Camera, Shirt, Vote, BarChart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: <Shirt className="h-4 w-4 mr-1.5" /> },
    { path: '/upload', label: 'Photos', icon: <Camera className="h-4 w-4 mr-1.5" /> },
    { path: '/outfits', label: 'Tenues', icon: <Shirt className="h-4 w-4 mr-1.5" /> },
    { path: '/vote', label: 'Voter', icon: <Vote className="h-4 w-4 mr-1.5" /> },
    { path: '/results', label: 'Résultats', icon: <BarChart className="h-4 w-4 mr-1.5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled ? "py-2 glass shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xl font-medium tracking-tight">OutfitVote</span>
          </motion.div>
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors",
                location.pathname === item.path
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
              )}
            >
              {item.icon}
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-2 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "md:hidden overflow-hidden glass",
          isMenuOpen ? "border-t border-border/20" : ""
        )}
      >
        <div className={cn("py-2 px-4", isMenuOpen ? "block" : "hidden")}>
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium flex items-center",
                  location.pathname === item.path
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
