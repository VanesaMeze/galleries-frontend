import { useState } from "react";
import GalleryRow from "./GalleryRow";

const FilterGalleries = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
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
        <button className="btn button-60" type="submit">
          Search
        </button>
      </form>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, index) => {
            return (
              <div
                className="list-group"
                key={index}
                style={{ width: "400px" }}
              >
                <div className="list-group-item list-group-item-action list-group-item-dark d-flex flex-column ml-3">
                  <span>{value.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterGalleries;
