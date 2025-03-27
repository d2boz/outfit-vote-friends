
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Camera, Shirt, Vote, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Camera size={24} />,
    title: "Capturez vos vêtements",
    description: "Prenez des photos de vos vêtements préférés pour commencer à créer vos tenues"
  },
  {
    icon: <Shirt size={24} />,
    title: "Créez vos tenues",
    description: "Organisez vos vêtements en tenues pour chaque jour de la semaine"
  },
  {
    icon: <Vote size={24} />,
    title: "Votez entre amis",
    description: "Invitez vos amis à voter pour vos tenues et recevez leurs avis"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout className="pb-20">
      <section className="pt-10 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Planifiez vos tenues, recevez l'avis de vos amis
            </h1>
            <p className="text-lg text-muted-foreground mb-8 md:mb-10">
              Une façon simple et élégante de planifier vos tenues de la semaine 
              et de laisser vos amis voter pour leurs préférées.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/upload')}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center justify-center"
              >
                Commencer
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50 -mx-4 px-4 rounded-3xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-medium tracking-tight mb-4">Comment ça marche</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OutfitVote simplifie votre routine vestimentaire et vous aide à prendre de meilleures décisions pour votre style.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-sm hover-lift text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              Prêt à transformer votre garde-robe ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Commencez dès aujourd'hui à organiser vos tenues et à recevoir des retours précieux de vos proches.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/upload')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium inline-flex items-center"
            >
              Commencer maintenant
              <ArrowRight size={18} className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
