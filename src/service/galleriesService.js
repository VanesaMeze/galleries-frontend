import { API } from "../shared/api";

export const getGalleries = (currentPage) => {
  return API.get(`/galleries?page=${currentPage}`);
};

export const getGalleryById = (id) => {
  return API.get(`/galleries/${id}`);
};

export const editGalleryById = (id, gallery) => {
  return API.put(`/galleries/${id}`, gallery);
};

export const createGallery = (name, description, urls) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
  });
};
