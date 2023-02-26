import React from "react";

import { Button, useNormalize, Theme, unboaredTheme, transparency, Text, space, useTheme, ButtonProps } from '@unboared/base-ui.all'
import { Image, View } from "react-native";


/**
 * A button used in forms.
 */
export const ExtraSignInButton = (props: any) => {
    const { normalize } = useNormalize()
    const theme = useTheme();


    return <Button
        {...props}
        preset="secondary"
        style={{ borderWidth: normalize(2), borderColor: transparency(theme.mode, 0.2) }}
        textStyle={{ color: theme.currentPalette.c200 }}
    />
}

type ExtraSignInButtonWithLogoProps = ButtonProps & {
    /* The path to the logo */
    logo: string,

    /* The size of the logo in the button */
    logoSize?: number,

    /* The text of the button */
    text?: string,

    /* The text of the button (translation reference) */
    tx?: string,

}

/**
 * A button used in forms with a particular logo image (not standard icon).
 */
export const ExtraSignInButtonWithLogo = ({ logo, logoSize = 15, text, tx, ...props }: ExtraSignInButtonWithLogoProps) => {
    const { normalize } = useNormalize()

    return (
        <ExtraSignInButton {...props}>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={{ width: normalize(logoSize), height: normalize(logoSize) }}
                    source={{
                        uri: logo
                    }}
                />
                <Text
                    style={{ fontFamily: "OpenSansSemiBold", marginLeft: normalize(space.small) }}
                    tx={tx}
                    text={text}
                />
            </View>
        </ExtraSignInButton>
    )
}