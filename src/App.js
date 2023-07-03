import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./register/Register";
import LogIn from "./register/Login";
import UserContext from "./storage/UserContext";
import { useContext, useEffect } from "react";
import GalleryContext from "./storage/GalleryContext";
import { getGalleries } from "./service/galleriesService";
import Home from "./pages/Home";
import MyGalleries from "./pages/MyGalleries";
import CreateGallery from "./pages/CreateGallery";
import ViewGallery from "./pages/ViewGallery";
import ProtectedRoute from "./shared/ProtectedRoute";
import AuthorsGalleries from "./pages/AuthorsGalleries";
import FilterGalleries from "./components/FilterGalleries";

function App() {
  const galleryContext = useContext(GalleryContext);

  const { signedIn } = useContext(UserContext);

  useEffect(() => {
    if (signedIn) {
      getGalleries().then(({ data }) => {
        galleryContext.updateGallery(data);
      });
    }
  }, [signedIn]);

  return (
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<LogIn />}></Route>

      <Route path="/galleries/:id" element={<ViewGallery />}></Route>
      <Route path="/authors/:id" element={<AuthorsGalleries />}></Route>

      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<FilterGalleries />}></Route>

      <Route
        path="/my-galleries"
        element={
          <ProtectedRoute>
            <MyGalleries />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateGallery />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/edit-gallery/:id"
        element={
          <ProtectedRoute>
            <CreateGallery />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
