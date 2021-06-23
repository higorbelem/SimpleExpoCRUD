import styled from 'styled-components/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const TextInput = styled.TextInput`
  width: 80%;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.input};
  text-align: center;
  margin-top: 10px;
  font-family: ${fonts.regular};
`;