import styled from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const Container = styled.TouchableOpacity<TouchableOpacityProps>`
  height: 50px;
  width: 200px;
  background-color: ${colors.button};
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

export const Text = styled.Text`
  color: ${colors.buttonText};
  text-align: center;
  font-size: 20px;
  font-family: ${fonts.regular};
`;