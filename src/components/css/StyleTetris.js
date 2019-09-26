import styled from 'styled-components';

export const StyleTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    background-size: cover;
    overflow: hidden;
`;

export const StyleTetris = styled.div`
    margin-top: -300px;
    display: flex;
    align-items: flex-start;
    padding: 400px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        margin-top: -300px;
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`;