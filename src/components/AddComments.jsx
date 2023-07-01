import { useContext, useState } from "react";
import { addComment } from "../service/galleriesService";
import UserContext from "../storage/UserContext";

const AddComments = ({ galleryId, setComments }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState({
    body: "",
    gallery_id: galleryId,
    user_id: user.user.id,
  });

  const resetInput = () => {
    setComment({
      body: "",
      gallery_id: galleryId,
      user_id: user.user.id,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = (event, comment) => {
    event.preventDefault();

    addComment(comment.body, galleryId, user.user.id);

    setComments((prevState) => [
      ...prevState,
      {
        body: comment.body,
        gallery_id: galleryId,
        user_id: user.user.id,
      },
      console.log(user),
    ]);

    resetInput();
  };

  return (
    <>
      <form
        style={{ width: "500px" }}
        className="container mt-5"
        onSubmit={(event) => handleAdd(event, comment)}
      >
        <div className="mb-3">
          <label className="form-label" style={{ color: "lightgray" }}>
            Add comment:
          </label>
          <textarea
            data-bs-theme="dark"
            onChange={handleInputChange}
            value={comment.body}
            placeholder="Enter your comment..."
            className="form-control"
            name="body"
            style={{ width: "700px" }}
          >
            {user.user.first_name} {user.user.last_name}
          </textarea>
          <input type="hidden" />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-outline-light"
            disabled={!comment.body}
          >
            Post comment
          </button>
        </div>
      </form>
    </>
  );
};
export default AddComments;
