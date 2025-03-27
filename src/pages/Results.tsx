
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import OutfitCard from '@/components/OutfitCard';
import { ArrowLeft, Crown, ThumbsUp, Users, Calendar } from 'lucide-react';

// Mock data
const mockResults = [
  { id: '1', name: 'Tenue Lundi', day: 'Lundi', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400&h=500', votes: 12 },
  { id: '2', name: 'Tenue Mardi', day: 'Mardi', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500', votes: 8 },
  { id: '3', name: 'Tenue Mercredi', day: 'Mercredi', image: 'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?auto=format&fit=crop&q=80&w=400&h=500', votes: 15 },
];

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([...mockResults].sort((a, b) => b.votes - a.votes));
  const [animateResults, setAnimateResults] = useState(false);
  
  const totalVotes = results.reduce((sum, outfit) => sum + outfit.votes, 0);
  const topOutfit = results[0];

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateResults(true);
    }, 300);
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-medium mb-3">Résultats des votes</h1>
          <p className="text-muted-foreground">
            Découvrez quelles tenues ont eu le plus de succès auprès de vos amis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-2 order-2 md:order-1"
          >
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <ThumbsUp size={18} className="mr-2" />
              Classement des tenues
            </h2>
            
            <div className="space-y-4">
              {results.map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: animateResults ? 1 : 0, 
                    x: animateResults ? 0 : -20 
                  }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className={`flex items-center bg-secondary/30 rounded-lg p-3 ${
                    index === 0 ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center font-medium text-lg mr-3">
                    {index === 0 ? (
                      <span className="text-yellow-500">
                        <Crown size={24} />
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
                    <img 
                      src={outfit.image} 
                      alt={outfit.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{outfit.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={12} className="mr-1" />
                      <span>{outfit.day}</span>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: animateResults ? "auto" : 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="glass flex items-center px-4 py-2 rounded-full ml-2"
                  >
                    <span className="font-medium mr-1">{outfit.votes}</span>
                    <span className="text-sm text-muted-foreground">votes</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="bg-secondary/30 rounded-xl p-6 text-center">
              <h2 className="text-xl font-medium mb-4">Tenue préférée</h2>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <OutfitCard
                  id={topOutfit.id}
                  image={topOutfit.image}
                  name={topOutfit.name}
                  day={topOutfit.day}
                  showVotes
                  votes={topOutfit.votes}
                  className="mb-4"
                />
              </motion.div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Users size={16} className="mr-1.5" />
                  <span>{totalVotes} votes au total</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center mt-10 pt-4 border-t"
        >
          <button
            onClick={() => navigate('/vote')}
            className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Results;
