import React from 'react';
import ReactDOM from 'react-dom/client';
// নিচের লাইনটি পরিবর্তন করা হয়েছে কারণ App.js আপনার 'pages' ফোল্ডারের ভেতরে আছে
import App from './pages/App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);