import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LayoutContainer = styled.div`
    height: 100%;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    position: relative;
`;

export const Menu = styled.div`
    background-color: #f5ad42;
    position: static;
    /* height: 100%; */
    width: 100%;
    max-width: 300px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        padding:20px;
        width: 90%;
    }
`;

export const MenuItem = styled(NavLink)`
    width: 100%;
    padding: 20px;
    font-size: 1.2rem;

    &:hover{
        background-color: #c28934;
    }

    & + &{
        border-top: 1px solid #f8f8f8;
    }
`;