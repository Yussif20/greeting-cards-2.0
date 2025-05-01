import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardSelector from './components/CardSelector';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PropTypes from 'prop-types';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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

App.propTypes = {};

export default App;
