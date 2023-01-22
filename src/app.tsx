import React, { useCallback } from 'react'
// import * as Linking from 'expo-linking'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { Button, Heading, ThemeProvider, unboaredTheme } from '@unboared/base-ui.all'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import RecipesScreen from './screens/recipes'
// import RecipeScreen from './screens/recipe'
// import GeneratorScreen from './screens/generator'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { Appearance } from 'react-native'
// import Container from './components/container/main_container'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
// import * as SplashScreen from 'expo-splash-screen'
// import { useAuth } from './services/auth'
// import { useActiveUserManager } from './services/user'
// import { SignUp } from './screens/common/signup'

SplashScreen.preventAutoHideAsync()

// const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator()

// const MyRecipesStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Recipes"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Recipes" component={RecipesScreen} />
//       <Stack.Screen name="Recipe" component={RecipeScreen} />
//     </Stack.Navigator>
//   )
// }

// const AppTab = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="MyRecipes"
//       screenOptions={{ headerShown: false }}
//     >
//       <Tab.Screen name="MyRecipes">{() => <MyRecipesStack />}</Tab.Screen>
//       <Tab.Screen name="Generator" component={GeneratorScreen} />
//     </Tab.Navigator>
//   )
// }

// const MainStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Home">{() => <AppTab />}</Stack.Screen>
//       <Stack.Screen name="Settings" component={RecipeScreen} />
//     </Stack.Navigator>
//   )
// }

// const isAuthentified = (auth: any) => auth !== undefined && auth !== null

// const AppStack = () => {
//   // Gets the current auth
//   const auth = useAuth((state) => state.auth)

//   // Update the user data according to the authentified user
//   // useActiveUserManager(auth?.uid)

//   console.log(auth)

//   // Check if initial loading
//   const initialLoading = useAuth((state) => state.initialLoading)

//   console.log(initialLoading)
//   return !isAuthentified(auth) ? <SignUp /> : <MainStack />
// }

// Configure paths to screens and gamepads
// const config = {
//   screens: {
//     Home: {
//       screens: {
//         MyRecipes: {
//           screens: {
//             Recipes: {
//               path: '/recipes/:userID',
//               parse: {
//                 userID: String,
//               },
//             },
//             Recipe: {
//               path: '/recipe/:recipeID',
//               parse: {
//                 recipeID: String,
//               },
//             },
//           },
//         },
//         Generator: '/generator',
//         Create: '/create',
//       },
//       // Weeks: '/weeks',
//       // Week: '/week/:weekID',
//       // WeekList: '/weeklist/:weekID',
//     },
//     Settings: '/settings',
//   },
// }

// // Configure linking
// const linking = {
//   prefixes: [Linking.createURL('/'), 'exp://'],
//   config,
// }

// interface NavigationProps
//   extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export default function App(/* props: NavigationProps */) {
  const colorScheme = Appearance.getColorScheme()

  const [fontsLoaded] = useFonts({
    // GooddogRegular: require('./assets/fonts/gooddog-plain.regular.ttf'),
    GooddogRegular: require('./assets/fonts/GoodDog.otf'),
  })

  console.log()

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <View onLayout={onLayoutRootView}>
        <Heading style={{ fontFamily: 'GooddogRegular' }} text="Hello" />
        <Heading style={{ fontFamily: 'GooddogRegular' }} text="Hello" />
        <Heading style={{ fontFamily: 'GooddogRegular' }} text="Hello" />
      </View>
      {/* <NavigationContainer
        linking={linking}
        documentTitle={{
          formatter: (options, route) =>
            `Weekook • ${options?.title ?? route?.name}`,
        }}
        {...props}
      >
        <ThemeProvider
          theme={
            colorScheme === 'dark' ? unboaredTheme.dark : unboaredTheme.light
          }
        >
          <AppStack />
        </ThemeProvider>
      </NavigationContainer> */}
    </SafeAreaProvider>
  )
}
