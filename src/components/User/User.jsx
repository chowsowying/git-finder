import React, { useState, useEffect } from "react";
import "./User.css";
import { CgAlignCenter, CgAlignMiddle, CgBrowser } from "react-icons/cg";
import { TfiAlignCenter, TfiGithub } from "react-icons/tfi";
import { VscRepo } from "react-icons/vsc";
import { HiLocationMarker } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../../fetchFromAPI";

const User = () => {
  const { login } = useParams();

  //UserInfo
  const [userInfo, setUserInfo] = useState({});
  //UserRepos
  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await Promise.all([
          fetchFromAPI(`users/${login}`),
          fetchFromAPI(`users/${login}/repos`),
        ]);
        const data = await response[0];
        const repos = await response[1];
        setUserInfo(data);
        setUserRepos(repos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="container user-container">
      <Link to="/" className="btn btn-primary">
        Search for more users
      </Link>
      <div className="user-details">
        <div className="user-image">
          <img src={userInfo?.avatar_url} alt="profile-img" />
        </div>
        <div className="user-content">
          <h3>{userInfo?.name}</h3>
          <p className="user-bio">
            {userInfo?.bio
              ? userInfo?.bio.length > 100
                ? userInfo?.bio.slice(0, 100) + "..."
                : userInfo?.bio
              : "No bio found"}
          </p>
          <div className="user-data">
            <p>
              <FaUserAlt className="data-icon" />
              {userInfo?.followers} followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <HiLocationMarker className="data-icon" />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <CgBrowser className="data-icon" />
                {userInfo?.blog}
              </p>
            )}
            <p>
              <a href={userInfo?.html_url} className="btn btn-primary">
                View Github Profile
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {userRepos ? (
          userRepos.map((repo) => {
            const { name, html_url, description, language, created_at } = repo;
            return (
              <div key={repo.id} className="repo">
                <h3>
                  <VscRepo className="repo-icon" />
                  <a href={html_url} className="repo-link">
                    {name}
                  </a>
                </h3>
                <p className="repo-desc">
                  {description
                    ? description.length > 100
                      ? description.slice(0, 100) + "..."
                      : description
                    : "No description found"}
                </p>
                <div className="repo-data">
                  <small>Created at: {created_at.slice(0, 10)}</small>
                  <br />
                  {language && <small>Written in: {language}</small>}
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Repos found</h2>
        )}
      </div>
    </div>
  );
};

export default User;
