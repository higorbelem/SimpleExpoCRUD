import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import CustomButton from '../../components/Button';
import CustomInput from '../../components/Input';

const {width, height} = Dimensions.get('screen');

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
`;

export const Logo = styled.Image`
  width: 80%;
  height: 200px;
`;

export const Input = styled(CustomInput)``;

export const Button = styled(CustomButton)`
  margin-top: 20px;
`;

export const Text = styled.Text`
  color: ${colors.invertedMainText};
  text-align: center;
  font-size: 16px;
  font-family: ${fonts.regular};
  text-align-vertical: center;
`;

export const RegisterButton = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;

export const RegisterButtonText = styled.Text`
  color: ${colors.button};
  text-align: center;
  font-size: 16px;
  font-family: ${fonts.bold};
`;

export const ContainerAvatar = styled.TouchableOpacity`
  
`;

export const ImageAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const IconAvatar = styled(FontAwesome5)`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
