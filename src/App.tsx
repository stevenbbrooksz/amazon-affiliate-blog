import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { Category } from './pages/Category';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-orange-600 selection:text-white pb-24 md:pb-16">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <AnnouncementBar />
        <Footer />
      </div>
    </Router>
  );
}
