
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import OutfitCard from '@/components/OutfitCard';
import { Calendar, ArrowLeft, ArrowRight, Plus, Save } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data
const mockClothes = [
  { id: '1', name: 'T-shirt blanc', image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '2', name: 'Jean bleu', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '3', name: 'Veste noire', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '4', name: 'Chemise rayée', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '5', name: 'Pull gris', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400&h=500' },
];

const mockOutfits = [
  { id: '1', name: 'Tenue Lundi', day: 'Lundi', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '2', name: 'Tenue Mardi', day: 'Mardi', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500' },
];

const daysOfWeek = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
];

const Outfits = () => {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState(mockOutfits);
  const [selectedDay, setSelectedDay] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState<string[]>([]);
  const [outfitName, setOutfitName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateOutfit = (day: string) => {
    setSelectedDay(day);
    setIsCreating(true);
    setOutfitName(`Tenue ${day}`);
    setSelectedClothes([]);
  };

  const handleSelectClothing = (id: string) => {
    setSelectedClothes(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleSaveOutfit = () => {
    if (selectedClothes.length === 0) {
      toast.error("Veuillez sélectionner au moins un vêtement");
      return;
    }

    setIsSaving(true);

    // Simulate delay
    setTimeout(() => {
      const newOutfit = {
        id: Date.now().toString(),
        name: outfitName,
        day: selectedDay,
        image: mockClothes.find(item => item.id === selectedClothes[0])?.image || ''
      };

      setOutfits(prev => [...prev, newOutfit]);
      setIsCreating(false);
      setIsSaving(false);
      
      toast.success("Tenue créée avec succès!");
    }, 1000);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
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
          <h1 className="text-3xl font-medium mb-3">Créez vos tenues</h1>
          <p className="text-muted-foreground">
            Constituez vos tenues pour chaque jour de la semaine à partir de vos vêtements.
          </p>
        </motion.div>

        {isCreating ? (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/30 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                  <Calendar size={20} className="mr-2" />
                  Créer une tenue pour {selectedDay}
                </h2>
                <div>
                  <input
                    type="text"
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="px-3 py-1.5 bg-background rounded-md text-sm border border-border"
                    placeholder="Nom de la tenue"
                  />
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Sélectionnez les vêtements pour cette tenue (sélection multiple possible)
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mockClothes.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative"
                    onClick={() => handleSelectClothing(item.id)}
                  >
                    <OutfitCard
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      selectable
                      selected={selectedClothes.includes(item.id)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                <button
                  onClick={handleCancelCreate}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                >
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveOutfit}
                  disabled={isSaving}
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-md font-medium flex items-center disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Enregistrer
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-medium mb-4">Vos tenues</h2>
              
              {outfits.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {outfits.map((outfit) => (
                    <OutfitCard
                      key={outfit.id}
                      id={outfit.id}
                      image={outfit.image}
                      name={outfit.name}
                      day={outfit.day}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-secondary/30 rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore créé de tenues
                  </p>
                  <button
                    onClick={() => handleCreateOutfit('Lundi')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium inline-flex items-center"
                  >
                    <Plus size={16} className="mr-1.5" />
                    Créer votre première tenue
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-medium mb-4">Planifiez votre semaine</h2>
              
              <div className="grid gap-3">
                {daysOfWeek.map((day) => {
                  const hasOutfit = outfits.some(outfit => outfit.day === day);
                  
                  return (
                    <div 
                      key={day}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover-lift"
                    >
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-3 text-muted-foreground" />
                        <span className="font-medium">{day}</span>
                      </div>
                      
                      <button
                        onClick={() => handleCreateOutfit(day)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                          hasOutfit 
                            ? "bg-secondary text-muted-foreground hover:bg-secondary/80" 
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {hasOutfit ? "Modifier" : "Ajouter une tenue"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-between items-center mt-10 pt-4 border-t"
        >
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour
          </button>
          <div className="text-sm text-muted-foreground">
            Étape 2/3 : Création des tenues
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/vote')}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium flex items-center"
          >
            Passer au vote
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Outfits;
