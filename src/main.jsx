import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import Layout from './components/Layout/Layout.jsx'
import './global/globalStyles.css'
import App from './App.jsx'
import { AuthProvider } from './components/Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <App />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
