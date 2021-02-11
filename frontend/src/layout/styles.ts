import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LayoutContainer = styled.div`
    height: 100%;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    position: relative;
    @media(max-width: 1100px) {
        flex-direction: column;
    }

    @media(max-width: 767px) {
        flex-direction: column;

        thead{
            display: none !important;
        }
    }
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

    @media(max-width: 1100px) {
        /* position: fixed; */
        height: 10vh;
        min-width: 100%;
        min-height: 0;
        flex-direction: row;
        align-items: flex-start;

        img{
            padding:20px;
            width: auto; 
            height: 100%;
        }
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

    @media(max-width: 1100px) {
        /* font-size: 1rem; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        & + &{
            border-top: 0;
        }
    }

    @media(max-width: 767px) {
        font-size: 0.9rem;
    }
`;