import {
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { ThemedText } from "@/lib/ui/ThemedText";
import { Logo } from "@/components/Logo";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleIcon } from "@/components/Googleicon";
import Animated, { FadeIn } from "react-native-reanimated";
import { useState, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ThemedInput } from "@/lib/ui/ThemedInput";
import { Spinner } from "@/lib/ui/Spinner";
import { authClient } from "@/lib/auth-client";

export default function Welcome() {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const form = useForm({
    defaultValues: { email: "" },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Please enter a valid email address"),
      }),
    },
    onSubmit: async ({ value }) => {
      const { error, data } = await authClient.emailOtp.sendVerificationOtp({
        email: value.email,
        type: "sign-in",
      });
      if (error) {
        return console.log(error);
      }

      router.push({
        pathname: "/verify-otp",
        params: {
          email: value.email,
        },
      });
    },
  });

  const handleContinuePress = () => {
    if (!showInput) {
      setShowInput(true);
      // wait a tick for mount before focusing, like requestAnimationFrame
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    // submit logic
    form.handleSubmit();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
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
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Animated.View entering={FadeIn.duration(180)}>
                        <ThemedInput
                          ref={inputRef}
                          value={field.state.value}
                          onChangeText={field.handleChange}
                          onBlur={field.handleBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          className={cn(
                            "text-[16px] rounded-2xl",
                            isInvalid ? "border-destructive" : "border-border",
                          )}
                          placeholder="Enter your email address"
                        />
                        {isInvalid && (
                          <ThemedText className="mt-1 text-destructive text-center">
                            {field.state.meta.errors
                              .map((e) => e?.message)
                              .join(", ")}
                          </ThemedText>
                        )}
                      </Animated.View>
                    );
                  }}
                </form.Field>
              )}
              <form.Subscribe selector={(state) => [state.isSubmitting]}>
                {([isSubmitting]) => (
                  <Pressable
                    disabled={isSubmitting}
                    onPress={handleContinuePress}
                    className="items-center justify-center flex-row py-4 gap-2 bg-primary rounded-2xl shadow-sm"
                  >
                    {isSubmitting && <Spinner />}
                    <ThemedText className="text-primary-foreground text-[16px] font-medium">
                      Continue with email
                    </ThemedText>
                  </Pressable>
                )}
              </form.Subscribe>
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
              By continuing, you acknowledge that you understand and agree to
              the{" "}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
