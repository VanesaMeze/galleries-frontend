import React, { useContext, useEffect, useState } from "react";
import UserContext from "../storage/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGallery,
  editGalleryById,
  getGalleryById,
} from "../service/galleriesService";

const CreateNewGalleryForm = () => {
  const { user } = useContext(UserContext);
  const { signedIn } = useContext(UserContext);
  const [urls, setUrls] = useState([""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [],
    user_id: user.user?.id,
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
    }
    if (!signedIn) {
      navigate("/login");
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gallery.description.length > 1000) {
      setError("Description must be max 1000 characters long.");
      return;
    }

    if (gallery.name.length === 0 || gallery.name.length < 2) {
      setError(
        "Name field is required and must contain at least 2 characters."
      );
      return;
    }

    if (gallery.urls.length === 0) {
      setError("Url field is required.");
      return;
    }

    if (Array.isArray(gallery.urls) && gallery.urls.some((url) => url === "")) {
      setError("Please fill in all URL fields or remove them.");
      return;
    }

    const imageExtensions = ["png", "jpg", "jpeg"];

    const urlValidationRegex = /^(http|https):\/\/[^ "]+$/;

    for (const url of gallery.urls) {
      if (!urlValidationRegex.test(url)) {
        setError("Please enter a valid URL.");
        return;
      }

      const fileExtension = url.split(".").pop().toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        setError(
          "Please enter a URL ending with a valid image extension (png, jpg, jpeg)."
        );
      }

      if (id) {
        editGalleryById(id, gallery);
      } else {
        createGallery(
          gallery.name,
          gallery.description,
          gallery.urls,
          user.user?.id
        );
      }

      setError("");
      setGallery({
        name: "",
        description: "",
        urls: [],
        userIdd: user.user?.id,
      });

      navigate("/");
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;

    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  return (
    <div className="form-floating mb-3">
      <div className=" d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div
            className="form-floating mb-3"
            style={{ color: "white", padding: "20px" }}
          >
            <h5
              className="text-center mb-4"
              style={{
                fontStyle: "italic",
                fontWeight: "300",
                fontSize: "1cm",
              }}
            >
              Create new gallery
            </h5>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form
              data-bs-theme="dark"
              className="container mt-5"
              onSubmit={(event) => handleSubmit(event, gallery)}
            >
              <div className="form-floating mt-3">
                <input
                  name="name"
                  value={gallery.name}
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Enter gallery name"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  name="description"
                  value={gallery.description}
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Add a description to your gallery"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div></div>
              <div className="form-floating mt-3">
                {urls.map((url, index) => (
                  <div
                    className="form-group col-sm-6 flex-column d-flex"
                    key={index}
                  >
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter image url"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      required
                      pattern=".*\.(png|jpg|jpeg)$"
                      title="Please enter a valid image URL ending with .png, .jpg, or .jpeg"
                    />
                    <label htmlFor="url"></label>
                    <br />

                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm mt-2 mb-2"
                        onClick={() => removeUrlField(index)}
                      >
                        Remove URL
                      </button>
                    )}
                  </div>
                ))}
                <div className="form-group col-sm-6">
                  <button
                    type="button"
                    className="btn button-60"
                    onClick={addUrlField}
                  >
                    Add new URL
                  </button>
                </div>
              </div>
              <div className="row justify-content-end mt-3">
                <div className="form-group col-sm-6">
                  <button
                    type="submit"
                    className="btn button-60"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGalleryForm;
