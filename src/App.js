import { Route, Routes } from 'react-router-dom';
import Login from './UserAuthentication/Login';
import Header from './Components/Header';
import Home from './Components/Home';
import { UserAuthContextProvider } from "./context/userAuthContext";
import { PostFunctionsContextProvider } from './context/PostFunctions';
import { createContext } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SigninAuth from './UserAuthentication/Signin';
import RegisterUser from './UserAuthentication/Registration';
import ProtectedRoute from './Components/ProtectedRouts';

export const DataContext = createContext(null);

function App() {

    return (
    <Provider store={store}>
          <div className="App">
            <UserAuthContextProvider >
              <PostFunctionsContextProvider>
                  <Routes>
                    <Route exact path="/" element={<><Login /></>} />
                    <Route
                      path="/home"
                      element={
                        <ProtectedRoute>
                          <Header /><Home />
                        </ProtectedRoute>
                      }
                    />
                    <Route exact path="/signin" element={<><SigninAuth /></>} />
                    <Route exact path="/joinnow" element={<><RegisterUser /></>} />
                  </Routes>
              </PostFunctionsContextProvider>
            </UserAuthContextProvider>
          </div>
    </Provider >
  );
}

export default App;
