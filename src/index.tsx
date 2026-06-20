import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './dist/CartContext';
import { BrowserRouter } from 'react-router-dom';
import Footer from './dist/Footer';
import Header from './dist/Header';
import { ThemeProvider } from './dist/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <App />
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
