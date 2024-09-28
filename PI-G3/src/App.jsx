import { Route, Routes, ScrollRestoration } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Detail from "./Page/Detail";
import Home from "./Page/Home";
import ScrollToTop from "./Components/ScrollToTop";
import CreateAccount from "./Page/CreateAccount";
import Login from "./Page/Login";
import ControlPanel from "./Page/ControlPanel"
import Favorites from "./Page/Favorites";
import RegisterProductForm from "./Page/RegisterProductForm";
import ProductAdmin from "./Page/ProductAdmin"
import Reservation from "./Page/Reservation";
import {ReservationConfirmed} from "./Page/ReservationConfirmed";
import HistorialReservas from "./Page/HistorialReservas";
import Wpp from "./Components/wpp";





function App() {
  return (
    <div className="container-bigger">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Login" element={<Login />}/>  
        <Route path="/createaccount" element={<CreateAccount/>}/>
        <Route path="/userlist" element={<ControlPanel/>}/>
        <Route path="/registerproduct" element={<RegisterProductForm/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/productadmin" element={<ProductAdmin/>}/>
        <Route path="/reservation/:id" element={<Reservation/>}/>
        <Route path="/reservationConfirmed/:id" element={<ReservationConfirmed/>}/>
        <Route path="/historial" element={<HistorialReservas/>} />
        <Route path="*" element={<h1>Error 404 - Page not found</h1>}/>
      </Routes>
       <Wpp/>
       <Footer /> 
    </div>
  );
}

export default App;