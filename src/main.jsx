import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import ForgetPass from './ForgetPass/ForgetPass.jsx'
import ResetPass from './ResetPass/ResetPass.jsx'
import ProfileSetting from './ProfileSetting/ProfileSetting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/profile" element={<ProfileSetting/>} />


      </Routes>
    </BrowserRouter>
    </StrictMode>,
)
