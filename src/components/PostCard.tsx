import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Post } from '../types';
import { guidePath } from '../guides';

interface PostCardProps {
  post: Post;
  index: number;
  layout?: 'grid' | 'list';
}

export const PostCard: React.FC<PostCardProps> = ({ post, index, layout = 'grid' }) => {
  const isList = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group flex overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 ${
        isList ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      <Link 
        to={guidePath(post.id)}
        className={`block overflow-hidden ${
          isList ? 'w-full md:w-[320px] aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={post.headerImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className={`flex flex-1 flex-col ${isList ? 'p-6' : 'p-6 lg:p-8'}`}>
        <div className="mb-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-orange-600">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar className="h-3 w-3" />
            {post.date}
          </div>
        </div>
        
        <Link to={guidePath(post.id)}>
          <h2 className={`mb-3 font-bold leading-tight text-gray-900 group-hover:text-orange-600 transition-colors ${
            isList ? 'text-xl lg:text-2xl' : 'text-2xl'
          }`}>
            {post.title}
          </h2>
        </Link>
        
        <p className={`mb-4 text-gray-600 leading-relaxed ${isList ? 'line-clamp-2 lg:line-clamp-3' : 'line-clamp-3'}`}>
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
              {post.author[0]}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          
          <Link
            to={guidePath(post.id)}
            className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:gap-2 transition-all"
          >
            Read Article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
