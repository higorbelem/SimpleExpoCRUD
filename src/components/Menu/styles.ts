import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 15px;
  padding-top: ${(StatusBar.currentHeight || 0) + 15}px;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const UserNameContainer = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const Greating = styled.Text`
  color: ${colors.secondaryText};  
  font-size: 16px;
  font-family: ${fonts.regular};
`;

export const UserName = styled.Text`
  color: ${colors.mainText};
  font-size: 18px;
  font-family: ${fonts.bold};
`;

export const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const MenuContainer = styled.View`
  flex: 1;
  padding-vertical: 10px;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
`;

export const MenuItemText = styled.Text`
  color: ${colors.mainText};
  font-size: 18px;
  font-family: ${fonts.bold};
`;

export const Separator = styled.View`
  width: 90%;
  border-color: ${colors.invertedSecondaryText}90;
  border-bottom-width: 1px;
  margin-vertical: 10px;
`;