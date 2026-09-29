import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL!, // Base URL of your Better Auth backend.
  plugins: [
    emailOTPClient(),
    expoClient({
      scheme: "togglecalendarapp",
      storagePrefix: "togglecalendarapp",
      storage: SecureStore,
    }),
  ],
});
