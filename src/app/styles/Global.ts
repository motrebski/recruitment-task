import styled from 'styled-components';

export const Button = styled.button<{ $color?: string; $background?: string; $border?: string }>`
  background: ${props => props.$background || "white"};
  color: ${props => props.$color || "white"};
  font-size: 1em;
  padding: 0.25em 1em;
  border: ${props => props.$border || "none"};
  border-radius: 3px;
  cursor: pointer;
`;

export const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: white;
  border-radius: 3px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
`;

export const Title = styled.div<{ $fontSize?: string }>`
  font-size: ${props => props.$fontSize || "x-large"};
  font-weight: bold;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  border-bottom: 1px solid #d7d6d6ff;
`;

export const FieldContainer = styled.div`
  display: flex;
  padding-top: 1.25rem;
  paddin-bottom: 1.25rem;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 1.35rem;
  border: 1px solid #d7d6d6ff;
  border-radius: 3px;
`;

export const Label = styled.label`
  margin-right: 1.25rem;
`;

export const Form = styled.form`
  padding: 1.25rem;
`;

export const ButtonContainer = styled.div<{ $paddingRight?: string }>`
  display: flex;
  justify-content: end;
  gap: 0.75rem;
  padding: 1.25rem;
  padding-right: ${props => props.$paddingRight || "1.25rem"};
`;

export const FormContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 2.25rem;
  width: 31.25rem;
  @media only screen and (max-width: 767px) {
    margin-right: unset;
    margin-left: unset;
    width: unset;
  }
`;

export const FormErrorField = styled.span`
  color: red;
  font-size: small;
  }
`;

export const FormStatusMessage = styled.div<{ $color?: string }>`
  color: ${props => props.$color || "black"};
  padding-bottom: 1.25rem;
  padding-left: 1.25rem;
  }
`;

export const TableContainer = styled.div`
  padding: 0.625rem;
  border: 1px solid #d7d6d6ff;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%; 
  border-collapse: collapse;
  border: 1px solid #d7d6d6ff;
`;

export const Td = styled.td`
  padding: 0.625rem;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #d7d6d6ff;
`;

export const Th = styled.th`
  text-align: left;
  background: #dddddd;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: medium;
  font-weight: normal;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  &:nth-of-type(3) {
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.3);
`;

export const ModalPosition = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  padding: 1.25rem;
  font-size: x-large;
  font-weight: bold;
`;

export const ModalBody = styled.div`
  position: relative;
  background: white;
  border-radius: 0.375rem;
  width: 25rem;
  @media only screen and (max-width: 767px) {
    width: unset;
  }
`;

export const ModalTextContainer = styled.div`
  border-bottom: 1px solid #d7d6d6ff;
  border-top: 1px solid #d7d6d6ff;
  padding: 1.25rem;
`;
