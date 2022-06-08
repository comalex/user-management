import ReactDOM from 'react-dom/client';

import App from './App';
// Context
import { AuthContextProvider } from './context/auth';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
