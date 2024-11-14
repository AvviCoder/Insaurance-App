import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./Pages/LoginPage";
import RegisterationPage from "./Pages/RegisterPage";
import PrivateRoute from "./Components/PrivateRoute";
import UserDashBoard from "./Components/UserDashboard";
import DocUpload from "./Components/DocumentUpload";
import AdditionalDocUpload from "./Components/AdditionalDocUpload";
import HomePage from "./Pages/HomePage";
import DeclarationPage from "./Pages/DeclarationPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster 
               reverseOrder={true}/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes where only authenticated users can go */}
          <Route path="/Document-Upload" element={<DocUpload />} />
          <Route path="/userDashboard" element={<UserDashBoard />} />
          <Route path="/additional-document" element={<AdditionalDocUpload />} />
          <Route path="/DeclarationPage" element={<DeclarationPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
