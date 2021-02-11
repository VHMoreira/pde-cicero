import styled from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;

export const TableContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

    header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
        >div{
            flex:1;
            font-size: 1.2rem;
            font-weight: 600;
        }
    }
`;