import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useLinkTo } from "~/navigation/router";

import { accent_color } from "@unboared/base-ui.theme.colors";

import { Button, Heading, Text, TextInput, useNormalize, space, useTranslate } from "@unboared/base-ui.all";
import { useMargin } from "../hooks/useMargin";
import { PasswordInput } from "./PasswordInput";
import { useAuth } from "~/services/auth";

export const EmailPasswordSignIn = () => {
    const { normalize } = useNormalize()
    const { translate } = useTranslate()
    const { smallMargin, mediumMargin, largeMargin } = useMargin()

    const linkTo = useLinkTo()

    const {
        status,
        email,
        password,
        changeEmail,
        changePassword,
        emailErrorMessage,
        passwordErrorMessage,
        errorMessage,
        login,
        onForgotPassword
    } = useAuth()

    useEffect(() => {
        if (status === 'RESET_PASSWORD') {
            linkTo(`/auth/mail?mail=${email}`)
        }
    }, [email, status])


    return (
        <>
            <Heading type="h2" style={smallMargin} tx="common.signin.title" />
            <Text style={smallMargin} tx="common.signin.description" />
            <TextInput
                style={{ height: normalize(30) }}
                containerStyle={mediumMargin}
                text={email}
                onChangeText={changeEmail}
                textContentType="emailAddress"
                placeholder={translate("common.signin.email_password.email.placeholder")}
                returnKeyType="next"
                helperText={translate(emailErrorMessage)}
                warning={emailErrorMessage}
            />
            <PasswordInput
                password={password}
                onChangeValue={changePassword}
                passwordErrorMessage={translate(passwordErrorMessage)}
            />
            <ForgotPasswordButton onPress={onForgotPassword} />
            <Button style={smallMargin} tx="common.signin.email_password.submitButton" onPress={() => login(email, password)} />
        </>
    )
}

export const ForgotPasswordButton = ({ onPress }: { onPress: () => void }) => {
    const { largeMargin } = useMargin()

    return (
        <Pressable onPress={onPress}>
            <Text style={{
                ...largeMargin,
                color: accent_color.important,
                fontFamily: "OpenSansBold",
                alignSelf: "flex-end"
            }}
                tx="common.signin.email_password.forgotPassword.message"
            />
        </Pressable>
    )
}  
