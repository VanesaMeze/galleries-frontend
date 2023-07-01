import { useContext, useEffect } from "react";
import { getGalleries } from "../service/galleriesService";
import GalleryRow from "../components/GalleryRow";
import UserContext from "../storage/UserContext";
import GalleryContext from "../storage/GalleryContext";
import { useNavigate } from "react-router-dom";

const MyGalleries = () => {
  const { galleries, updateGallery } = useContext(GalleryContext);
  const { user, signedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (signedIn) {
      getGalleries().then(({ data }) => {
        const userGalleries = data.data.filter(
          (data) => data.user.id === user.user.id
        );
        updateGallery(userGalleries);
      });
    } else {
      if (!signedIn) {
        navigate("/login");
      }
    }
  }, [updateGallery, user.id]);

  return (
    <div>
      <div className="container" style={{ margin: "auto" }}>
        {Array.isArray(galleries) && galleries.length > 0 ? (
          <div>
            <GalleryRow galleries={galleries} />
          </div>
        ) : (
          <p className="container mt-5">No content to show.</p>
        )}
      </div>
    </div>
  );
};
export default MyGalleries;
