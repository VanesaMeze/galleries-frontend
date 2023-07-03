import { useContext, useEffect, useState } from "react";
import { getGalleries } from "../../service/galleriesService";
import GalleryContext from "../../storage/GalleryContext";

const Pagination = () => {
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
    <div>
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
    </div>
  );
};

export default Pagination;
