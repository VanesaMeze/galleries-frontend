import { useState } from "react";

const FilterGalleries = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [state, setState] = useState({
    search: "",
  });

  const [galleriesCopy, setGalleriesCopy] = useState([""]);

  const handleSearch = (event, name) => {
    event.preventDefault();
    setGalleriesCopy(
      galleriesCopy.filter((gallery) => gallery.name?.includes(name))
    );
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div>
      <form
        data-bs-theme="dark"
        className="d-flex mt-3"
        style={{ width: "500px" }}
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
        <button
          onClick={(e) => handleSearch(e, state.search)}
          className="btn button-60"
          type="submit"
        >
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
