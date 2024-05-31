import { useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import rocket from "../assets/Rocket-unscreen.gif";

export default function GitHubLoginCallback() {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const getAccessToken = async (code: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/login/github?code=${code}`,
        {
          code,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const { token, user_info } = response.data;
      localStorage.setItem("accessToken", token);
      setCurrentUser({
        name: user_info.name,
        image_path: user_info.image_path,
      });
      navigate("/");
    } catch (error) {
      console.error("Error while fetching access token:", error);
    }
  };

  useEffect(() => {
    const qs = queryString.parse(window.location.search);
    const code = qs.code as string;
    getAccessToken(code);
  }, []);
  return (
    <Loading>
      <img src={rocket} alt="loading" />
    </Loading>
  );
}

const Loading = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: block;
  opacity: 0.8;
  background: rgb(247, 247, 252);
  z-index: 99;
  text-align: center;

  & img {
    position: absolute;
    top: 45%;
    left: 45%;
    z-index: 100;
    width: 100px;
    height: 100px;
  }
`;
