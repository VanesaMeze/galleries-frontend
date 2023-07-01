const Comments = ({ comments, handleDelete, user, signedIn, gallery }) => {
  return (
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
              Author: {gallery?.user.first_name} {gallery?.user.last_name}
            </small>
          </figure>
          {signedIn && user.user?.id === comment?.user_id ? (
            <button
              className="btn btn-outline-light"
              type="delete"
              onClick={() => handleDelete(comment.id)}
            >
              Delete Comment
            </button>
          ) : null}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Comments;
