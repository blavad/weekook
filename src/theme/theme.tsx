import { color, dark, light, palette, transparency } from "@unboared/base-ui.all"

export const base_color = {
    light: light.c900,
    light_secondary: '#CCD7DE',
    light_tertiary: '#ABADC6',
    dark: dark.c900,
    dark_secondary: '#1f1b30',
    dark_tertiary: '#424867',
}

export const accent_color = {
    important: palette.green.c500,
    error: palette.yellow.c500,
    warning: palette.red.c500,
    success: palette.green.c500,
    info: palette.blue.c500,
}

export const weekook_color = {
    dark: base_color.dark,
    dark_secondary: base_color.dark_secondary,
    dark_tertiary: base_color.dark_tertiary,
    light: base_color.light,
    light_secondary: base_color.light_secondary,
    light_tertiary: base_color.light_tertiary,
    primary: palette.green.c500,
    secondary: palette.yellow.c500,
    complementary: palette.blue.c500,
    palette: palette,
    player: [],
    error: accent_color.error,
    warning: accent_color.warning,
    success: accent_color.success,
    info: accent_color.info,
}


const lightColorTheme = {
    mode: 'light',
    currentPalette: palette.white,
    backgroundColor: color.light,
    titleColor: color.dark,
    textColor: color.dark,
    buttonColor: palette.green.c500,
    buttonTextColor: color.dark,
    secondaryButtonColor: transparency('light'),
    secondaryButtonTextColor: color.dark,
    color: color,
}

const darkColorTheme = {
    /* COLORS */
    mode: 'dark',
    currentPalette: palette.black,
    backgroundColor: color.dark,
    titleColor: color.light,
    textColor: color.light,
    buttonColor: palette.green.c500,
    buttonTextColor: color.light,
    secondaryButtonColor: transparency('dark'),
    secondaryButtonTextColor: color.light,
    color: color,
}

const unboaredDesignTheme = {
    /* FONTS */
    primaryTitleFont: 'GoodDogRegular',
    secondaryTitleFont: 'KalamRegular',
    textFont: 'KalamLight',
    buttonFont: 'KalamRegular',

    /* TITLE SIZE */
    sizeH1: 18,
    sizeH2: 14,
    sizeH3: 10,
    sizeH4: 8,
    sizeH5: 5,
    sizeP: 9,

    /* BOXES */
    borderRadius: 16,
    boxShadow: 'unset',
}


export const unboaredGreenDarkTheme = Object.assign({}, unboaredDesignTheme,  darkColorTheme);
export const unboaredGreenLightTheme = Object.assign({}, unboaredDesignTheme, lightColorTheme);

export const weekookDarkTheme = Object.assign({}, unboaredGreenDarkTheme, {});
export const weekookLightTheme = Object.assign({}, unboaredGreenLightTheme, {});
