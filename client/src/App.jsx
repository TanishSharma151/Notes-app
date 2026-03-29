import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DisplayNotes from "./pages/DisplayNotes";
import DeletedNotes from "./pages/components/DeletedNotes";

function App() {
  return (
    <div data-theme="sunset">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/notes"
          element={
              <DisplayNotes />
          }
        />
        <Route path="/notes/deleted" element={<DeletedNotes />} />
      </Routes>
    </div>
  );
}

export default App;
