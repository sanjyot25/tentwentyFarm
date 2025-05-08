import React from 'react';
import "./index.css"
import { createRoot } from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';


const root = createRoot(document.getElementById('root'));
root.render(<App />);
