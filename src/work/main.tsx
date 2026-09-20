import { createRoot } from 'react-dom/client';
import '../index.css';
import WorkApp from './WorkApp';
import { UnlockProvider } from '../context/UnlockContext';

createRoot(document.getElementById('root')!).render(
  <UnlockProvider>
    <WorkApp />
  </UnlockProvider>,
);
