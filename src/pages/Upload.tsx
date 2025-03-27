
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ImageUploader from '@/components/ImageUploader';
import { Input } from '@/components/ui/input';
import { Plus, Shirt, ArrowRight, Save } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data for demonstration
const mockClothes = [
  { id: '1', name: 'T-shirt blanc', image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '2', name: 'Jean bleu', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: '3', name: 'Veste noire', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=500' },
];

const Upload = () => {
  const navigate = useNavigate();
  const [clothes, setClothes] = useState(mockClothes);
  const [newItem, setNewItem] = useState({ name: '', file: null as File | null });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (file: File) => {
    setNewItem(prev => ({ ...prev, file }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(prev => ({ ...prev, name: e.target.value }));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.file) {
      toast.error("Veuillez ajouter une photo et un nom pour le vêtement");
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(newItem.file as File);
      const newClothingItem = {
        id: Date.now().toString(),
        name: newItem.name,
        image: imageUrl
      };

      setClothes(prev => [...prev, newClothingItem]);
      setNewItem({ name: '', file: null });
      setIsUploading(false);
      
      toast.success("Vêtement ajouté avec succès!");
    }, 1500);
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
          <h1 className="text-3xl font-medium mb-3">Ajoutez vos vêtements</h1>
          <p className="text-muted-foreground">
            Prenez des photos de vos vêtements pour commencer à créer vos tenues hebdomadaires.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-secondary/30 p-6 rounded-xl"
          >
            <h2 className="text-xl font-medium mb-4">Nouveau vêtement</h2>
            <div className="space-y-4">
              <ImageUploader onImageUpload={handleImageUpload} />
              <Input
                placeholder="Nom du vêtement (ex: T-shirt blanc)"
                value={newItem.name}
                onChange={handleNameChange}
                className="bg-background"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddItem}
                disabled={isUploading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center disabled:opacity-70"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Plus size={18} className="mr-2" />
                    Ajouter
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Vos vêtements</h2>
              <span className="text-sm text-muted-foreground">
                {clothes.length} {clothes.length > 1 ? 'vêtements' : 'vêtement'}
              </span>
            </div>
            
            <div className="h-[380px] overflow-y-auto pr-2 space-y-3">
              {clothes.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover-lift"
                >
                  <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.name}</h3>
                  </div>
                </motion.div>
              ))}
              
              {clothes.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <Shirt size={40} className="text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">
                    Ajoutez votre premier vêtement pour commencer
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-between items-center pt-4 border-t"
        >
          <p className="text-sm text-muted-foreground">
            Étape 1/3 : Ajout des vêtements
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/outfits')}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium flex items-center"
            disabled={clothes.length === 0}
          >
            Créer des tenues
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Upload;
