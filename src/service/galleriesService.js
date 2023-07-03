import { API } from "../shared/api";

export const getGalleries = (currentPage, params) => {
  return API.get(`/galleries?page=${currentPage}`, { params });
};

export const getGalleryById = (id) => {
  return API.get(`/galleries/${id}`);
};

export const editGalleryById = (id, gallery) => {
  return API.put(`/galleries/${id}`, gallery);
};

export const createGallery = (name, description, urls, user_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    user_id,
  });
};

export const deleteGalleryById = (id, gallery) => {
  return API.delete(`/galleries/${id}`, gallery);
};

export const addComment = (body, gallery_id, user_id) => {
  return API.post(`/galleries/${gallery_id}/comments`, {
    body,
    gallery_id,
    user_id,
  });
};

export const deleteCommentById = (id) => {
  return API.delete(`/comments/${id}`);
};
