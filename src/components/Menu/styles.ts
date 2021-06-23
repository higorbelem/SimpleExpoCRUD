import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding-top: ${StatusBar.currentHeight}px;
`;

export const Text = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
    
`;