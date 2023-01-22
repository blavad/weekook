import { TextInput, useNormalize, useTranslate } from "@unboared/base-ui.all";
import React, { useState } from "react";
import { useMargin } from "../hooks/useMargin";


export const PasswordInput = ({ password, onChangeValue, passwordErrorMessage, ...props }: any) => {

    const { normalize } = useNormalize()
    const { translate } = useTranslate()
    const { smallMargin, mediumMargin, largeMargin } = useMargin()

    const [visible, setVisibility] = useState({ name: "eye-off" });

    const toggleVisibilty = () => {
        if (visible.name === "eye") {
            setVisibility({ name: "eye-off" });
        } else {
            setVisibility({ name: "eye" });
        }
    };

    const secureTextEntry = () => {
        if (visible.name === "eye") {
            return false;
        } else if (visible.name === "eye-off") {
            return true;
        }
    };

    return (
        <TextInput
            style={{ height: normalize(30) }}
            containerStyle={mediumMargin}
            text={password}
            onChangeText={onChangeValue}
            placeholder={translate("common.signin.email_password.password.placeholder")}
            returnKeyType="go"
            secureTextEntry={secureTextEntry()}
            textContentType="password"
            keyboardType="default"
            autoCorrect={false}
            warning={passwordErrorMessage}
            {...props}
            helperText={passwordErrorMessage}
        />
    )
}