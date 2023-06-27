import { useState } from "react";
import GalleryContext from "./GalleryContext";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  const postNewGallery = (gallery) => {
    const existingGallery = galleryState.find((c) => c.name === gallery.name);
    if (existingGallery) {
      return;
    }
    addGallery(animal).then(({ data }) => {
      setGalleryState((prevState) => [...prevState, data]);
    });
  };

  const galleryContext = {
    galleries: galleryState,
    updateGallery: setGalleryState,
    addGallery: postNewGallery,
  };
  return (
    <GalleryContext.Provider value={galleryContext}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
