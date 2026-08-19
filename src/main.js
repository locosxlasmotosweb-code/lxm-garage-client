import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './admin.css';
import './uploads.css';
import './auth.css';
import './lobby.css';
import './lobby-v2.css';
import './admin-v2.css';
import './threads.css';
import './story-admin.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
