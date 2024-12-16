import React,{useState} from 'react';
import { observer } from 'mobx-react-lite'; // Import observer
import store from './store/store';
import { Loading } from './components/component';
import LoginPage from './pages/Login/login';
import MainPage from './pages/Main/main';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App = observer(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center bg-custom-gradient mx-auto p-4 w-screen h-screen container md:p">
      {/* Render Loading component if isLoading is true */}
      {store.isLoading && <Loading />}

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/Main" replace /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/Main"
            element={
              isLoggedIn ? <MainPage /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
