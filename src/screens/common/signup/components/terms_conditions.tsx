import React from "react"
import { View, ViewStyle } from "react-native"
import { Heading, Icon, Text, CheckBox, useNormalize, space } from "@unboared/base-ui.all"
import { useMargin } from "../../signin";


export type TermsConditionsProps = {
    icon: string,
    txTitle: string,
    txDescription: string,
    checked?: boolean,
    onValueChange?: any,
    disabled?: boolean,
}

export const TermsConditions = ({ icon, txTitle, txDescription, checked, onValueChange, disabled }: TermsConditionsProps) => {

    const { normalize } = useNormalize()
    const { mediumMargin } = useMargin()

    const styles = {
        container: {

        } as ViewStyle,
        subContainer: {
            flex: 1,
            flexDirection: 'row',
            ...mediumMargin,
        } as ViewStyle,
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Icon name={icon} size={12} />
                <View style={{ flex: 1, alignItems: "flex-start", marginHorizontal: normalize(space.medium) }}>
                    <Heading type="h5" tx={txTitle} />
                    <Text preset='light' tx={txDescription} />
                </View>
                <CheckBox value={checked} onValueChange={onValueChange} disabled={disabled} size={10} />
            </View>
        </View>
    )

}