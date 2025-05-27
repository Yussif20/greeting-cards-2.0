import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardSelector from './components/CardSelector';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { useMemo } from 'react';

const App = () => {
  const appClassName = useMemo(
    () =>
      'flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300',
    []
  );

  return (
    <Router>
      <div className={appClassName}>
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
