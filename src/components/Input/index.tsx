import React from 'react';
import colors from '../../styles/colors';

import { 
    TextInput
} from './styles';

export type InputProps = {
    placeholder: string;
    //style?: React.CSSProperties;
    style?: object;
    state?: 'correct' | 'wrong' | '';
    onChangeText?: (text: string) => void;
    isPass?: boolean;
}

export default function Input(props: InputProps) {

    let borderColor = null;
    switch (props?.state) {
        case 'correct':
            borderColor = colors.green;
            break;
        case 'wrong':
            borderColor = colors.red;
            break;
        default:
            break;
    }

    return (
        <TextInput 
            placeholder={props.placeholder}
            placeholderTextColor={colors.placeholder}
            style={{
                borderWidth: borderColor !== null ? 2 : 0,
                borderColor: borderColor || '#000'
            }}
            onChangeText={props.onChangeText}
            secureTextEntry={props.isPass}
        />
    )
}