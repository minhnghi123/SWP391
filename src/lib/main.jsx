import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../lib/App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../components/Services/AuthLogin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='428240789533-0ph77i9n53v8cqc7b8m55h7rq3hh7efn.apps.googleusercontent.com'>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
