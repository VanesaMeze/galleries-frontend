import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteCommentById,
  deleteGalleryById,
  getGalleryById,
} from "../service/galleriesService";
import Carousel from "react-bootstrap/Carousel";
import AddComments from "../components/AddComments";
import UserContext from "../storage/UserContext";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { getUsers } from "../service/usersService";

const ViewGallery = () => {
  const { signedIn, user } = useContext(UserContext);
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = gallery.urls?.split(",") || [];
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
        setComments(data.comments);
        console.log(data.comments);
      });
    }
  }, [id, setComments]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete comment?"
    );
    if (shouldDelete) {
      deleteCommentById(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    }
  };

  const handleDeleteGallery = () => {
    if (window.confirm("Are you sure you want to delete this gallery?")) {
      deleteGalleryById(id).then(() => {
        navigate("/my-galleries");
      });
    }
  };

  return (
    <div>
      <br />
      <section
        className="container"
        style={{
          maxWidth: "700px",
          alignItems: "center",
          textAlign: "center",
          color: "rgb(229,228,226)",
        }}
      >
        <h2
          style={{
            fontWeight: "300",
            fontSize: "1cm",
          }}
        >
          {gallery.name}
        </h2>
        <h6
          style={{
            fontSize: "0.5cm",
            fontStyle: "italic",
            fontWeight: "300",

            color: "rgb(229,228,226)",
          }}
        >
          Description: {gallery.description}
        </h6>
        <div
          className="container"
          style={{ alignItems: "center", color: "rgb(196,174,173)" }}
        >
          <div className="mb-1 text-body-secondary">
            <Link
              to={`/authors/${gallery.user?.id}`}
              className="link-body text-decoration-none"
              style={{ color: "rgb(196,174,173)" }}
            >
              Author: {gallery.user?.first_name} {gallery.user?.last_name}
            </Link>
          </div>
          <p className="card-text mb-auto">Release date: {formattedDate}</p>
          <br />
        </div>
      </section>
      <div
        className="row row-cols-1 justify-content-center"
        style={{ margin: "auto", width: "600px" }}
      >
        <Carousel>
          {urls.map((url, index) => (
            <Carousel.Item key={index}>
              <a href={url.trim()} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-100"
                  src={url.trim()}
                  alt={`Slide ${index}`}
                  width="500"
                  height="500"
                />
              </a>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <br />
      {signedIn && user.user.id === gallery.user_id ? (
        <div
          className="row row-cols-2 justify-content-center"
          style={{ margin: "0 auto", width: "200px" }}
        >
          <Link
            className="btn btn-outline-light"
            to={`/edit-gallery/${gallery.id}`}
          >
            Edit
          </Link>{" "}
          <button
            className="btn btn-outline-light"
            onClick={handleDeleteGallery}
          >
            Delete
          </button>
        </div>
      ) : (
        isDisabled
      )}

      <div
        className="container mt-5 justify-content-center"
        style={{ width: "500px", color: "rgb(229,228,226)" }}
      >
        {comments?.map((comment) => (
          <div key={comment?.id} className="comment">
            <figure>
              <blockquote className="blockquote">
                <p>{comment?.body}</p>
              </blockquote>
              <small
                className="blockquote-footer"
                title="Source Title"
                style={{ color: "rgb(196,174,173)" }}
              >
                Author:{" "}
                {Array.isArray(users)
                  ? (() => {
                      const user = users.find(
                        (user) => user.id === comment.user_id
                      );
                      return user
                        ? `${user.first_name} ${user.last_name}`
                        : null;
                    })()
                  : null}
              </small>
            </figure>
            <div>
              {signedIn && user.user.id === comment?.user_id ? (
                <button
                  className="btn btn-outline-light"
                  type="delete"
                  onClick={() => handleDelete(comment?.id)}
                >
                  Delete Comment
                </button>
              ) : null}
              <hr />
            </div>
          </div>
        ))}
      </div>
      <div>
        {signedIn ? (
          <AddComments key={id} galleryId={id} setComments={setComments} />
        ) : null}
      </div>
    </div>
  );
};
export default ViewGallery;
