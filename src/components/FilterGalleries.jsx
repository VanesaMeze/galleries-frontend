import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const FilterGalleries = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isFiltered === true) {
      setCurrentPage(1);
    }
  }, [isFiltered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data?.filter((value) => {
      return value.name
        .toLowerCase()
        .includes(
          searchWord.toLowerCase() ||
            value.description
              .toLowerCase()
              .includes(searchWord.toLowerCase()) ||
            value.user.first_name
              .toLowerCase()
              .includes(searchWord.toLowerCase()) ||
            value.user.last_name
              .toLowerCase()
              .includes(searchWord.toLowerCase())
        );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    setIsFiltered(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        data-bs-theme="dark"
        className="d-flex mt-3"
        style={{ width: "500px", margin: "0 auto" }}
        role="search"
      >
        <input
          value={wordEntered}
          id="mySearch"
          name="search"
          onChange={handleFilter}
          className="form-control me-2"
          type="search"
          placeholder="Search Galleries"
          aria-label="Search"
        />
        <Link to={`/?search=${filteredData}`}>
          <button
            className="btn button-60"
            type="submit"
            onSubmit={handleSubmit}
          >
            Search
          </button>
        </Link>
      </form>
      <br />
      <br />
      {Array.isArray(filteredData) && filteredData.length !== 0 && (
        <>
          <p style={{ color: "rgb(196,174,173)" }}>
            {" "}
            Compatible with your filter:
          </p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredData.map((value, index) => {
              return (
                <div
                  div
                  key={index}
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
                      src={value.urls.split(",")[0]}
                      className="card-img"
                      alt={`${value.name}`}
                      width="100"
                      height="300"
                      style={{ opacity: "0.4" }}
                    />
                    <div className="card-img-overlay">
                      <h5 className="card-title">{value.name}</h5>
                      <p className="card-text">{value.description}</p>
                      <p className="card-text">
                        <small>
                          Author: {value.user.first_name} {value.user.last_name}
                        </small>
                        <br />
                        <small className="card-text mb-auto">
                          Release date:{" "}
                          {format(parseISO(value.created_at), "dd-MM-yyyy")}
                        </small>
                      </p>
                      <Link
                        to={`/galleries/${value.id}`}
                        className="btn btn-outline-light"
                      >
                        View gallery
                      </Link>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterGalleries;
