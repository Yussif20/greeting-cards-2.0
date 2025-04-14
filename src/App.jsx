// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardSelector from './components/CardSelector';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<CardSelector />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
