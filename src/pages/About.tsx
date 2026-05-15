import React from 'react';
import { motion } from 'motion/react';
import { SITE_SETTINGS } from '../generated/site-settings.generated';

export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          {SITE_SETTINGS.aboutTitle}
        </h1>
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-gray-600">
          <p>
            {SITE_SETTINGS.aboutBody}
          </p>
          <p>
            We believe that every purchase, no matter how small, deserves careful consideration. That's why we spend hours researching, testing, and comparing products to ensure that our recommendations are based on actual performance and value.
          </p>
          <p>
            Whether you're looking to upgrade your smart home setup, build the perfect home office, or find reliable gear for your next outdoor adventure, we've got you covered.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12">{SITE_SETTINGS.aboutCommitmentTitle}</h2>
          <p>
            {SITE_SETTINGS.aboutCommitmentBody}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
