import { lazy } from 'solid-js';
import { Route, Router, Navigate } from '@solidjs/router';
import { AuthProvider } from './lib/auth.tsx';
import './App.css';

// Lazy load pages for better performance
const Chat = lazy(() => import('./page/Chat'));

// Create a home page component that redirects to /chat
function Home() {
  return <Navigate href="/chat" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route>
          <Route path="/" component={Home} />
          <Route path="/chat" component={Chat} />
          {/* Add more routes as needed */}
        </Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
