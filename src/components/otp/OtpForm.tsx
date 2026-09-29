import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "@tanstack/react-form";
import Animated, { FadeInUp } from "react-native-reanimated";
import { authClient } from "@/lib/auth-client";
import { ThemedText } from "@/lib/ui/ThemedText";
import { Spinner } from "@/lib/ui/Spinner";
import { cn } from "@/lib/utils";
import AppleOTPInput, {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/lib/ui/InputOtp";

const OTP_LENGTH = 6;

export function OtpForm({
  shouldDisableInput,
  email,
}: {
  shouldDisableInput: boolean;
  email: string;
}) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  return (
    <View className="gap-2 w-full">
      <Animated.View className="w-full">
        <InputOTP
          maxLength={6}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, idx) => (
                <InputOTPSlot key={idx} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
        <ThemedText className="text-xs text-center text-muted-foreground mt-2">
          (Expires in 5 mins)
        </ThemedText>
      </Animated.View>
    </View>
  );
}
