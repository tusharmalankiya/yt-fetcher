import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  max-width: 600px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h1`
  text-align: center;
  padding: 1rem;
  font-family: "Lobster", cursive;
  font-size: 2.4rem;
  background: -webkit-linear-gradient(#0b2447, #19376d, #576cbc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const YLink = styled.input`
  margin: 1rem 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 2px solid #94af9f;
  padding: 1rem;
  font-family: "Rubik", sans-serif;
  font-size: 1.2rem;

  &::placeholder {
    opacity: 0.3;
  }

  &:focus {
    border-width: 4px;
  }
`;

export const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background: #7aa874;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.5px;

  &:active {
    background: #41644a;
    transition: all 0.2s;
  }
`;

export const DownloadButton = styled.a`
  margin: 1rem 0.5rem;
  margin-bottom: 5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background: #00235b;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;

  &:active {
    background: #41644a;
    transition: all 0.2s;
  }
`;

export const Thumbnail = styled.img`
  max-height: 300px;
  width: max-content;
  max-width: 100%;
  object-fit: cover;
  margin: auto;
  padding: 10px;
`;

export const Title = styled.h3`
  font-family: "Roboto", sans-serif;
  margin: 1rem 0.5rem;
  color: #146c94;
  font-size: 1.2rem;
`;
