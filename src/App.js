import './App.css';
import './global.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from './Pages/SignUpPage/SignUpPage';
import SignInPage from './Pages/SignInPage/SignInPage';
// import WorkSpace from './Pages/WorkSpace/WorkSpace';
// import AccountPage from './Pages/AccountPage/AccountPage';
import AppPage from './Pages/AppPage/AppPage';
import { setAuthToken } from './client/auth';
import RouteGuard from './components/RouteGuard/RouteGuard';
import { useEffect, useState } from 'react';
import { verifyToken } from './client/auth/auth';


const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem("token");
    
      const verify = await verifyToken(token);

      if (!verify) {
        localStorage.removeItem("token");
      }

      setReady(true);
    }

    func();
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='auth/signup' element={<SignUpPage />}/>
            <Route path='auth/signin' element={<SignInPage />}/>

            <Route path='app/*' element={
              <RouteGuard>
                <AppPage />
              </RouteGuard>
            } />
            
            <Route path='*' element={<Navigate to="/app" />}/>
            <Route path='' element={<Navigate to="/app" />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
