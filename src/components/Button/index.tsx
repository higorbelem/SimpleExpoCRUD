import React from 'react';
import colors from '../../styles/colors';
import {ActivityIndicator} from 'react-native';
import { 
    Container,
    Text
} from './styles';

type ButtonProps = {
    text: string;
    //style?: React.CSSProperties;
    style?: object;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button(props: ButtonProps) {
    return (
        <Container 
            style={[
                props.style,
                props.disabled && {backgroundColor: colors.invertedSecondaryText}
            ]} 
            onPress={props.onPress} 
            activeOpacity={0.7} 
            disabled={props.disabled}
        >
            <Text>{props.text}</Text>
            {
                props.loading && (
                    <ActivityIndicator 
                        animating
                        size={40}
                        color={colors.green}
                        style={{
                            position: 'absolute',
                        }}
                    />
                )
            }
        </Container>
    )
}