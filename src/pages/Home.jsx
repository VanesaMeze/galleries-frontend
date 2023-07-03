import { useContext, useEffect } from "react";
import { getGalleries } from "../service/galleriesService";
import GalleryRow from "../components/GalleryRow";
import GalleryContext from "../storage/GalleryContext";
import FilterGalleries from "../components/FilterGalleries";

const Home = () => {
  const { galleries, updateGallery } = useContext(GalleryContext);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      updateGallery(data.data);
      console.log(data.data);
    });
  }, []);

  return (
    <div>
      <div className="container" style={{ margin: "auto" }}>
        {Array.isArray(galleries) && galleries.length > 0 ? (
          <div>
            <FilterGalleries data={galleries} />
            <br />
            <GalleryRow galleries={galleries} />
          </div>
        ) : (
          <p className="container mt-5">No content to show.</p>
        )}
      </div>
    </div>
  );
};
export default Home;
