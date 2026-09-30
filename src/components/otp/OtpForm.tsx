import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "@tanstack/react-form";
import Animated, { FadeInUp } from "react-native-reanimated";
import { authClient } from "@/lib/auth-client";
import { ThemedText } from "@/lib/ui/ThemedText";
import { Spinner } from "@/lib/ui/Spinner";
import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/lib/ui/InputOtp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp-native";
import { toast } from "sonner-native";
import { showErrorToast } from "@/lib/ui/ShowError";

export function OtpForm({
  shouldDisableInput,
  email,
}: {
  shouldDisableInput: boolean;
  email: string;
}) {
  const otpRef = useRef<React.ComponentRef<typeof InputOTP>>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const { data, error } = await authClient.signIn.emailOtp({
          email,
          otp: value.otp,
        });

        if (error) {
          otpRef.current?.clear();

          if (error.code === "INVALID_OTP" || error.code === "OTP_EXPIRED") {
            const message = "Token has expired or is invalid";
            formApi.setFieldValue("otp", "");

            formApi.setFieldMeta("otp", (meta) => ({
              ...meta,
              errorMap: { ...meta.errorMap, onSubmit: message },
            }));

            setTimeout(() => otpRef.current?.focus(), 0);
            return;
          }

          // surface with your toast solution
          showErrorToast({
            errorMessage: error.message ?? "Something went wrong",
          });
          return;
        }

        if (data) {
          router.replace("/");
        }
      } catch (error) {
        // surface with your toast solution
        showErrorToast({
          errorMessage: "Something went wrong, try again",
        });
      }
    },
  });

  return (
    <View className="gap-2 w-full">
      <Animated.View className="w-full">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field name="otp">
              {(field) => {
                const isInvalid = !!field.state.meta.errorMap.onSubmit;
                return (
                  <View pointerEvents={isSubmitting ? "none" : "auto"}>
                    <InputOTP
                      ref={otpRef}
                      value={field.state.value}
                      onChange={(value) => {
                        field.handleChange(value);
                        if (value.length > 0 && isInvalid) {
                          field.form.setFieldMeta("otp", (meta) => ({
                            ...meta,
                            errorMap: { ...meta.errorMap, onSubmit: undefined },
                          }));
                        }
                      }}
                      onComplete={() => form.handleSubmit()}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      editable={!isSubmitting}
                      selectTextOnFocus={!isSubmitting}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, idx) => (
                            <InputOTPSlot
                              key={idx}
                              {...slot}
                              isInvalid={isInvalid}
                            />
                          ))}
                          {isSubmitting && (
                            <View className="absolute inset-0 justify-center items-center">
                              <Spinner />
                            </View>
                          )}
                        </InputOTPGroup>
                      )}
                    />

                    {isInvalid ? (
                      <ThemedText className="text-sm text-center text-destructive mt-2">
                        {field.state.meta.errorMap.onSubmit}
                      </ThemedText>
                    ) : (
                      <ThemedText className="text-xs text-center text-muted-foreground mt-2">
                        (Expires in 5 mins)
                      </ThemedText>
                    )}
                  </View>
                );
              }}
            </form.Field>
          )}
        </form.Subscribe>
      </Animated.View>
    </View>
  );
}
