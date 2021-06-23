import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
    Container,
    Button
} from './styles';
import colors from '../../styles/colors';

type HeaderProps = {
    onPress?: () => void;
}

export default function Header({onPress} : HeaderProps) {
    return (
        <Container>
            <Button onPress={onPress}>
                <Feather name="menu" size={32} color={colors.mainText} />
            </Button>
        </Container>
    )
}