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
          <Route path="/profile" element={<ProfileSetting/>} />
          <Route path="/projectsetting" element={<ProjectSetting />} />
          <Route path="/portofolio" element={<PortofolioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>  
    </StrictMode>,
)
