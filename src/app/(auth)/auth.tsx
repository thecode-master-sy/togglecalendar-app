import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { ThemedText } from "@/lib/ui/ThemedText";
import { Logo } from "@/components/Logo";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleIcon } from "@/components/Googleicon";
import Animated, { FadeIn } from "react-native-reanimated";
import { useState, useRef } from "react";

export default function Welcome() {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleContinuePress = () => {
    if (!showInput) {
      setShowInput(true);
      // wait a tick for mount before focusing, like requestAnimationFrame
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    // submit logic
  };

  return (
    <SafeAreaView className="flex-1  bg-background">
      <View className="flex-1 justify-center">
        <View className="gap-6 items-center justify-center">
          <Logo />

          <View>
            <ThemedText className="text-3xl text-center tracking-tighter font-semibold">
              Your all in one study app.
            </ThemedText>
            <ThemedText className="text-3xl text-center tracking-tighter font-semibold text-[#a19e99]">
              Log in to Togglecalendar
            </ThemedText>
          </View>
        </View>

        <View className="pb-8 gap-4 mt-12 px-6">
          {showInput && (
            <Animated.View entering={FadeIn.duration(180)}>
              <TextInput
                className="bg-input p-4 text-[16px] rounded-2xl border border-border font-sans"
                placeholder="Enter your email address"
              />
            </Animated.View>
          )}

          <Pressable
            onPress={handleContinuePress}
            className="items-center justify-center py-4 bg-primary rounded-2xl shadow-sm"
          >
            <ThemedText className="text-primary-foreground text-[16px] font-medium">
              Continue with email
            </ThemedText>
          </Pressable>
          <Pressable className="items-center flex-row gap-2 justify-center py-4 rounded-2xl bg-accent shadow-sm">
            <GoogleIcon />
            <ThemedText className="text-accent-foreground text-[16px] font-medium">
              Continue with google
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <View className="px-6 py-8">
        <ThemedText className="text-sm text-center">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <ThemedText
            className="text-sm"
            style={{ textDecorationLine: "underline" }}
          >
            Terms & Conditions
          </ThemedText>{" "}
          and{" "}
          <ThemedText
            className="text-sm"
            style={{ textDecorationLine: "underline" }}
          >
            Privacy Policy
          </ThemedText>
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}
