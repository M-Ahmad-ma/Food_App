import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import image from './assets/Content/image 2.png';
import image2 from './assets/Content/image 3.png';
import image3 from './assets/Content/image 5-1.png';
import image4 from './assets/Content/image 5.png';
import image5 from './assets/Content/image 6.png';

const defaultDishes = [
  {
    id: 1,
    name: "Spicy Shrimp",
    price: 15,
    bowls: 10,
    image: image,
    category: 'hot dishes',
  },
  {
    id: 2,
    name: "Veggie Delight",
    price: 12,
    bowls: 15,
    image: image2,
    category: 'hot dishes',
  },
  {
    id: 3,
    name: "Meat Lover's Pizza",
    price: 19,
    bowls: 8,
    image: image3,
    category: 'hot dishes',
  },
  {
    id: 4,
    name: "Chicken Fajitas",
    price: 14,
    bowls: 12,
    image: image4,
    category: 'hot dishes',
  },
  {
    id: 5,
    name: "Beef Tacos",
    price: 13,
    bowls: 11,
    image: image5,
    category: 'hot dishes',
  },
  {
    id: 6,
    name: "Veggie Burgers",
    price: 11,
    bowls: 16,
    image: image3,
    category: 'hot dishes',
  },
  {
    id: 7,
    name: "Shrimp Scampi",
    price: 17,
    bowls: 7,
    image: image4,
    category: 'hot dishes',
  },
];

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem('dishes'));
    if (savedDishes && savedDishes.length > 0) {
      setDishes(savedDishes);
    } else {
      setDishes(defaultDishes);
      localStorage.setItem('dishes', JSON.stringify(defaultDishes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const addDish = (newDish) => {
    setDishes((prevDishes) => [...prevDishes, { ...newDish, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="bg-dark-bg min-h-screen">
        <Routes>
          <Route path="/" element={<Home dishes={dishes} />} />
          <Route path="/dashboard" element={<Dashboard dishes={dishes} />} />
          <Route path="/settings" element={<Settings dishes={dishes} addDish={addDish} />} />
        </Routes>
      </div>
    </Router>
  );
}; 

export default App;
