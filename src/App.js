import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./register/Register";
import LogIn from "./register/Login";
import UserContext from "./storage/UserContext";
import { useContext, useEffect } from "react";
import GalleryContext from "./storage/GalleryContext";
import { getGalleries } from "./service/galleriesService";

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
    </Routes>
  );
}

export default App;
