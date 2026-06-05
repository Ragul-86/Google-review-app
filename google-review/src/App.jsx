import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ReviewPage from "./pages/ReviewPage";
import ThankYouPage from "./pages/ThankYouPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<ReviewPage />}
        />
        <Route
          path="/review"
          element={<ReviewPage />}
        />

        <Route
          path="/thank-you"
          element={<ThankYouPage />}
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />
        <Route
          path="/admin-login"
          element={<AdminLogin />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;