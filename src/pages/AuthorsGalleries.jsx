import { useEffect, useState } from "react";
import { getUserById, getUserGalleries } from "../service/usersService";
import { Link, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const AuthorsGalleries = () => {
  const { id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [author, setAuthor] = useState({});

  useEffect(() => {
    if (id) {
      getUserById(id).then(({ data }) => {
        setAuthor(data.user);
        console.log(data.user);
        getUserGalleries(id).then(({ data }) => {
          setGalleries(data.galleries);
          console.log(data);
        });
      });
    }
  }, [id]);

  return (
    <>
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
        {author && (
          <h1
            style={{
              color: "rgb(196,174,173)",
              fontStyle: "italic",
              fontWeight: "300",
            }}
          >
            {author.first_name} {author.last_name}'s Galleries
          </h1>
        )}
      </section>
      <br />
      <div className="container" style={{ margin: "0 auto" }}>
        <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {Array.isArray(galleries) && galleries.length > 0 ? (
            galleries?.map((gallery, id) => (
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
                      <br />
                      <small>
                        Author: {author.first_name} {author.last_name}
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
            ))
          ) : (
            <p className="container mt-5">No content to show.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default AuthorsGalleries;
