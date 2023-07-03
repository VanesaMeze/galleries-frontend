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
        <FilterGalleries data={galleries} />
        {Array.isArray(galleries) && galleries.length > 0 ? (
          <div>
            <p style={{ color: "rgb(196,174,173)" }}>All galleries</p>
            <GalleryRow galleries={galleries} />
          </div>
        ) : (
          <p className="container mt-5" style={{ color: "rgb(196,174,173)" }}>
            No content to show.
          </p>
        )}
      </div>
    </div>
  );
};
export default Home;
