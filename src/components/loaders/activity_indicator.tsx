import { useTheme } from "rn-css"
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from "react-native"
import { Theme, unboaredTheme, useNormalize } from "@unboared/base-ui.all"

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
    const { normalize } = useNormalize()
    const theme = useTheme() as Theme || unboaredTheme.default

    const {
        size,
        color,
        ...rest
    } = props

    let customSize;
    if (typeof size === 'string') {
        switch (size) {
            case 'small':
                customSize = normalize(20)
                break;
            default:
                customSize = normalize(40)
                break;
        }
    }
    else {
        customSize = normalize(size || 20)
    }

    return (
        <RNActivityIndicator {...rest} color={color || theme.textColor} size={customSize} />
    )
}