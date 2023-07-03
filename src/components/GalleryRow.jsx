import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { getGalleries } from "../service/galleriesService";
import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";

const GalleryRow = () => {
  const { galleries, updateGallery } = useContext(GalleryContext);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.querySelector(".nav").classList.add("affix");
    getGalleries(currentPage).then(({ data }) => {
      updateGallery(data.data);
      setLastPage(data.last_page);
    });
  }, [currentPage]);

  const previousTen = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadNextTen = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {galleries?.map((gallery, id) => (
          <div
            key={id}
            className="text-center col m-5"
            style={{ width: "340px" }}
          >
            <div
              className="card text-bg-dark"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <img
                src={gallery.urls.split(",")[0]}
                className="card-img"
                alt={`${gallery.name}`}
                width="100"
                height="300"
                style={{ opacity: "0.4" }}
              />
              <div className="card-img-overlay">
                <h5 className="card-title">{gallery.name}</h5>
                <p className="card-text">{gallery.description}</p>
                <p className="card-text">
                  <small>
                    Author: {gallery.user?.first_name} {gallery.user?.last_name}
                  </small>
                  <br />
                  <small className="card-text mb-auto">
                    Release date:{" "}
                    {format(parseISO(gallery.created_at), "dd-MM-yyyy")}
                  </small>
                </p>
                <Link
                  to={`/galleries/${gallery.id}`}
                  className="btn btn-outline-light"
                >
                  View gallery
                </Link>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      {Array.isArray(galleries) && galleries.length > 1 && (
        <div className="text-center col m-5">
          <button
            className="btn arrow-left"
            onClick={previousTen}
            disabled={currentPage === 1}
          ></button>
          <button
            className="btn button-60"
            onClick={loadNextTen}
            disabled={currentPage === lastPage}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};
export default GalleryRow;
