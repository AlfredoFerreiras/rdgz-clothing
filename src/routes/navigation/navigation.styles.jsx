import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  /* Media query for mobile devices */
  @media screen and (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on smaller screens */
    height: auto; /* Adjust height to fit content */
    align-items: center; /* Center items when stacked */
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  /* Media query for mobile devices */
  @media screen and (max-width: 768px) {
    width: auto; /* Adjust width on smaller screens */
    padding: 10px; /* Reduce padding */
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* Media query for mobile devices */
  @media screen and (max-width: 768px) {
    width: 100%; /* Use full width for smaller screens */
    justify-content: center; /* Center links on smaller screens */
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  /* Media query for mobile devices */
  @media screen and (max-width: 768px) {
    padding: 8px 10px; /* Adjust padding */
  }
`;
