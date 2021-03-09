import styled from "styled-components";

export const Container = styled.div`
  h1 {
    text-align: center;
  }
  dialog-demo {
    .p-button {
      margin: 0 0.5rem 0 0;
      min-width: 10rem;
    }

    p {
      margin: 0;
      line-height: 1.5;
    }

    .confirmation-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .p-dialog .p-button {
      min-width: 6rem;
    }
  }
`;

export const Card = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const Search = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1px;
  flex-wrap: wrap;
`;

export const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 10px;
  flex-wrap: wrap;

  p {
    margin-left: 0px;
    margin-bottom: 1px;
  }
`;
