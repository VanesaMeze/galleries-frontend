import { createContext } from "react";

const GalleryContext = createContext({
  galleries: [],
  postGallery: () => {},
  updateGallery: () => {},
});

export default GalleryContext;
