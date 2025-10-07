import Navbar from "./pages/Navbar/Navbar.tsx";
import AppRoutes from "./AppRoutes/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {


  // async function getProfile() {
  //   const response = await fetch('/auth/api/v1/login', {
  //     method: 'GET',
  //     // credentials: 'include',
  //   });

  //   if (!response.ok) throw new Error('Failed to load profile');
  //   return response.json();
  // }


  return (
      <div>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
      </div>
  )
}

export default App
