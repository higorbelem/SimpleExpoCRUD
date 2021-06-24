import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.mainText};
  font-size: 24px;
  font-family: ${fonts.bold};
`;

export const UserCoordinates = styled.Text`
  color: ${colors.mainText};
  font-size: 16px;
  font-family: ${fonts.regular};
`;