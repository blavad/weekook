import React from 'react';
import { SignIn } from './signin';
import { unboaredTheme, UnboaredView } from '@unboared/base-ui.theme.themes';
import { View } from 'react-native';

const SignInDarkCompose = ({ theme }) => {

  return (
    <UnboaredView theme={theme}>
      <View style={{ alignSelf: 'center', width: 800, height: 500 }}>
        <SignIn />
      </View>
    </UnboaredView>
  );
}

export const ExampleSignInDark = () => (<SignInDarkCompose theme={unboaredTheme.dark} />)
export const ExampleSignInLight = () => (<SignInDarkCompose theme={unboaredTheme.light} />)