import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,

} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
 
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotel";
import EditHotel from "./forms/ManageHotelForm/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Details";
import Booking from "./pages/Booking";

const App = () => {
  const {isLoggedIn}=useAppContext()
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>HomePage</p>
            </Layout>
          }
        />
        
        <Route
          path="/register"
          element={
            <Layout>
              
              <Register/>
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              
              <SignIn/>
            </Layout>
          }
        />
             <Route
          path="/search"
          element={
            <Layout>
           <Search/>
            </Layout>
          }
          
        />
          <Route
          path="/detail/:hotelId"
          element={
            <Layout>
           <Detail/>
            </Layout>
          }
          
        />
        {
          isLoggedIn && <><Route path="/add-hotel" element={
            <Layout>
              <AddHotel/>
            </Layout>
          } />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
             <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
       
          </>
        }
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
};

export default App;
