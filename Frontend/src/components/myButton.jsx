import styled from 'styled-components';

const MyButton = styled.button`
    background-color: ${props => props.color};
    color: white;
    boreder-radius: 5px;
    padding: 5px 10px;
    font-size: .8rem;
    cursor: pointer;
`;

export default MyButton;