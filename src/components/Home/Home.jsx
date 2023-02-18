import React, { useState, useEffect } from "react";
import "./Home.css";
import { fetchFromAPI } from "../../fetchFromAPI";
import { Link } from "react-router-dom";

const Home = () => {
  //Search term
  const [searchTerm, setSearchTerm] = useState("");
  //Users
  const [users, setUsers] = useState([]);
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [perPage, setPerPage] = useState(10);

  //Fetch users function
  const fetchUsers = () => {
    fetchFromAPI(
      `search/users?q=${searchTerm}&page=${page}&per_page=${perPage}`
    )
      .then((data) => setUsers(data.items))
      .catch((error) => console.log(error));
  };

  //Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchUsers();
    }
  };

  //Handle prev page
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    } else {
      setPage(1);
    }
  };

  //Handle next page
  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  //Display users on change
  useEffect(() => {
    const displayUsersOnChange = () => {
      if (searchTerm) {
        fetchUsers();
      }
    };
    displayUsersOnChange();
  }, [page, perPage]);

  return (
    <div className="container search-container">
      <div className="search-header">
        <h4>GitFinder</h4>
        <div className="search-form">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search github username...."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="more-options">
          <label htmlFor="">
            <small>Per Page</small>
            <select
              onChange={(e) => setPerPage(parseInt(e.target.value))}
              name=""
              id=""
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage} className="page-btn">
              {page}
            </button>
            <button onClick={handleNextPage} className="page-btn">
              {page + 1}
            </button>
          </div>
        </div>
      </div>
      <div className="search-results">
        {users ? (
          users.map((user) => {
            console.log(user);
            const { avatar_url, login, id, name } = user;
            return (
              <div key={login} className="user">
                <div className="user-image">
                  <img src={avatar_url} alt={login} />
                </div>
                <div className="user-info">
                  <h2>{name}</h2>
                  <h4>{login}</h4>
                  <small>{id}</small>
                  <Link to={`/user/${login}`} className="btn">
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No users found</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
