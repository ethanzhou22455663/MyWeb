import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UnlockProvider } from './context/UnlockContext';

createRoot(document.getElementById('root')!).render(
  <UnlockProvider>
    <App />
  </UnlockProvider>
);
