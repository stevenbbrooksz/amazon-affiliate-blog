import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/3"
        >
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Get in <span className="text-orange-600">Touch</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Have a question about a review? Want us to look at a specific product? Or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:flex-1 w-full rounded-3xl bg-gray-50 p-8 sm:p-10 shadow-sm"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">First Name</label>
                <input type="text" className="mt-2 block w-full rounded-xl border-transparent bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-0" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" className="mt-2 block w-full rounded-xl border-transparent bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-0" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" className="mt-2 block w-full rounded-xl border-transparent bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-0" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Subject</label>
              <select className="mt-2 block w-full rounded-xl border-transparent bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-0">
                <option>General Inquiry</option>
                <option>Product Review Request</option>
                <option>Advertising</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Message</label>
              <textarea rows={4} className="mt-2 block w-full rounded-xl border-transparent bg-white px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-0" placeholder="Your message here..." />
            </div>
            <button className="w-full rounded-xl bg-orange-600 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-orange-700 shadow-xl shadow-orange-600/20">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
