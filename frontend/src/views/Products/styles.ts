import styled from "styled-components";

export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;

    >button{
        background-color: #f5ad42;
        border: 0;
        padding: 5px 10px;
        color: #fff;
        align-self: flex-end;
        border-radius: 5px;
        &:hover{
            background-color: #c28934;
        }
    }
`;