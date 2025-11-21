import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import ForgetPass from './ForgetPass/ForgetPass.jsx'
import ResetPass from './ResetPass/ResetPass.jsx'
import ProfileSetting from './ProfileSetting/ProfileSetting.jsx'
import { Provider } from 'react-redux'
import { store } from './store';
import ProjectSetting from './ProjectSetting/ProjectSetting.jsx'
import PortofolioPage from './PortofolioPage/PortofolioPage.jsx'
import './style.css';
import Browser from './Browser/Browser.jsx'
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AuthCallback from './AuthCallback.jsx'
import SearchBrowser from './SearchBrowser/SearchBrowser.jsx'
import FilterBrowser from './FilterBrowser/FilterBrowser.jsx'
import StaticPortofolioPage from './StaticPortofolioPage/StaticPortofolioPage.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/" element={<Browser/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/search-browser" element={<SearchBrowser />} />
          <Route path="/filter-browser" element={<FilterBrowser />} />
          <Route path="/static_portfolio/:id" element={<StaticPortofolioPage />} />
          

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileSetting />
              </ProtectedRoute>
            }
          />

          <Route
            path="projectsetting"
            element={
              <ProtectedRoute>
                <ProjectSetting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portofolio"
            element={
              <ProtectedRoute>
                <PortofolioPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>  
    </StrictMode>,
)
