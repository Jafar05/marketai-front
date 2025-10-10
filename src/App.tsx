import AppRoutes from "./AppRoutes/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";
import React from "react";

const App: React.FC = () => {
  return (
      <div>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
      </div>
  )
}

export default App
