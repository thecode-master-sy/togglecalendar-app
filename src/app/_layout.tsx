import { Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const isLoggedIn = false;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/auth" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(user)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
