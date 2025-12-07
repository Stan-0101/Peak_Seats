import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarComponent from './Components/NavBarComponent';
import ContentComponent from './Components/Content';
import FooterComponent from './Components/FooterComponent';
import BballPage from './Pages/BballPage';
import SwimmingPage from './Pages/SwimmingPage';
import VballPage from './Pages/VballPage';
import Araneta from './Pages/Araneta';  
import MOA from './Pages/MOA';
import LoginPage from './Pages/Login';
import Register from './Pages/Register';
import Meals from './Pages/Meals';
import AddtoCart from './Pages/AddtoCart';
import Checkout from './Pages/checkout';
import Online from './Pages/Online';
import Onsite from './Pages/Onsite';
import AquaDome from './Pages/SwimArena';
import Payment from './Pages/Payment';
import Pai from './Pages/PAIArena';
import FavoritePage from './Pages/Favorite';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBarComponent />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<ContentComponent />} />
            <Route path="/BasketballPage" element={<BballPage />} />
            <Route path="/SwimmingPage" element={<SwimmingPage />} />
            <Route path="/VolleyballPage" element={<VballPage />} />
            <Route path="/AranetaPage" element={<Araneta/>} /> 
            <Route path="/MOAPage" element={<MOA/>} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/RegisterPage" element={<Register />} />
            <Route path="/MealsPage" element={<Meals />} />
            <Route path="/CartPage" element={<AddtoCart />} />
            <Route path="/CheckoutPage" element={<Checkout />} />
            <Route path="/OnlinePage" element={<Online />} />
            <Route path="/OnsitePage" element={<Onsite />} />
            <Route path="/SwimArena" element={<AquaDome />} />
            <Route path="/PaymentPage" element={<Payment />} />
            <Route path="/PAIArena" element={<Pai />} />
            <Route path="/Favorites" element={<FavoritePage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>

        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
