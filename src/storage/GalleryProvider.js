import { useState } from "react";
import GalleryContext from "./GalleryContext";
import { createGallery } from "../service/galleriesService";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  const postNewGallery = (name, description, urls, user_id) => {
    createGallery(name, description, urls, user_id)
      .then(({ data }) => {
        setGalleryState((prevState) => [...prevState, data]);
      })
      .catch((error) => {
        console.error("Error occurred while adding gallery:", error);
      });
  };

  const galleryContext = {
    galleries: galleryState,
    updateGallery: setGalleryState,
    createGallery: postNewGallery,
  };
  return (
    <GalleryContext.Provider value={galleryContext}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
