import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          About <span className="text-orange-600">AMZReviews</span>
        </h1>
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-gray-600">
          <p>
            Welcome to AMZReviews, your premier destination for detailed, honest, and expert analysis of the latest products on Amazon. Our mission is simple: to help you make informed purchasing decisions through high-quality reviews and comprehensive buying guides.
          </p>
          <p>
            We believe that every purchase, no matter how small, deserves careful consideration. That's why we spend hours researching, testing, and comparing products to ensure that our recommendations are based on actual performance and value.
          </p>
          <p>
            Whether you're looking to upgrade your smart home setup, build the perfect home office, or find reliable gear for your next outdoor adventure, we've got you covered.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12">Our Commitment</h2>
          <p>
            Transparency is at the heart of everything we do. As an Amazon Associate, we earn from qualifying purchases, but our editorial content is never influenced by manufacturers or retailers. Our first priority is always you, the reader.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
