import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// যদি আপনার src ফোল্ডারে index.css ফাইলটি না থাকে, তবে নিচের লাইনটি ডিলিট করে দিন
// import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);