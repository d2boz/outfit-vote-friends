
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import OutfitCard from '@/components/OutfitCard';
import VoteButton from '@/components/VoteButton';
import { ArrowLeft, ArrowRight, Share2, Copy, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data
const mockOutfits = [
  { id: '1', name: 'Tenue Lundi', day: 'Lundi', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400&h=500', votes: 0 },
  { id: '2', name: 'Tenue Mardi', day: 'Mardi', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500', votes: 0 },
  { id: '3', name: 'Tenue Mercredi', day: 'Mercredi', image: 'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?auto=format&fit=crop&q=80&w=400&h=500', votes: 0 },
];

const Vote = () => {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState(mockOutfits);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [votingComplete, setVotingComplete] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const currentOutfit = outfits[currentOutfitIndex];
  const isLastOutfit = currentOutfitIndex === outfits.length - 1;

  const handleVote = (isUpvote: boolean) => {
    const updatedOutfits = [...outfits];
    updatedOutfits[currentOutfitIndex].votes += isUpvote ? 1 : -1;
    setOutfits(updatedOutfits);
    
    if (isLastOutfit) {
      setVotingComplete(true);
    } else {
      // Move to next outfit
      setTimeout(() => {
        setCurrentOutfitIndex(currentOutfitIndex + 1);
      }, 300);
    }
  };

  const shareVotingLink = () => {
    const dummyLink = `https://outfitvote.app/vote/${Date.now().toString(36)}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(dummyLink).then(() => {
      setLinkCopied(true);
      toast.success("Lien copié dans le presse-papier");
      
      setTimeout(() => {
        setLinkCopied(false);
      }, 3000);
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-medium mb-3">Votez pour les tenues</h1>
          <p className="text-muted-foreground">
            Donnez votre avis sur chaque tenue et partagez le lien avec vos amis.
          </p>
        </motion.div>

        {votingComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-10 max-w-md mx-auto"
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Check size={30} />
              </div>
              <h2 className="text-2xl font-medium mb-2">Vote terminé !</h2>
              <p className="text-muted-foreground">
                Vous avez voté pour toutes les tenues. Partagez avec vos amis pour obtenir leur avis.
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Lien de partage pour vos amis :
              </p>
              <div className="flex">
                <input 
                  type="text" 
                  readOnly 
                  value="https://outfitvote.app/vote/g4d8h2k9"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-l-lg text-sm"
                />
                <button
                  onClick={shareVotingLink}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-r-lg flex items-center"
                >
                  {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/results')}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium flex items-center mx-auto"
            >
              Voir les résultats
              <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tenue {currentOutfitIndex + 1} sur {outfits.length}
                </span>
                <span className="font-medium">{currentOutfit.day}</span>
              </div>
              
              <motion.div
                key={currentOutfit.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="aspect-[3/4] mb-6 rounded-xl overflow-hidden shadow-md relative"
              >
                <img 
                  src={currentOutfit.image} 
                  alt={currentOutfit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-xl font-medium">{currentOutfit.name}</h3>
                </div>
              </motion.div>
              
              <div className="flex items-center justify-center space-x-6">
                <VoteButton 
                  type="down" 
                  onClick={() => handleVote(false)} 
                />
                <VoteButton 
                  type="up" 
                  onClick={() => handleVote(true)} 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-10 pt-4 text-sm text-muted-foreground">
              <button
                onClick={shareVotingLink}
                className="flex items-center hover:text-foreground transition-colors"
              >
                <Share2 size={16} className="mr-1.5" />
                Partager ce vote avec des amis
              </button>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-between items-center mt-10 pt-4 border-t"
        >
          <button
            onClick={() => navigate('/outfits')}
            className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour
          </button>
          <div className="text-sm text-muted-foreground">
            Étape 3/3 : Vote et partage
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/results')}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium flex items-center"
          >
            Résultats
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Vote;
