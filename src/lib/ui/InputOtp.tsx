import { View, Text, Alert, ViewProps, StyleSheet } from "react-native";
import { OTPInput, type SlotProps } from "input-otp-native";
import type { OTPInputProps, OTPInputRef } from "input-otp-native";
import { useRef, useContext } from "react";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

function InputOTP({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof OTPInput>) {
  return <OTPInput style={StyleSheet.absoluteFill} {...props} />;
}

function InputOTPGroup({
  className,
  ...props
}: { className?: string } & ViewProps) {
  return (
    <View
      className={cn("flex-row items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  char,
  isActive,
  hasFakeCaret,
  className,
  isInvalid,
}: { className?: string; isInvalid: boolean } & SlotProps) {
  return (
    <View
      className={cn(
        "w-[50px] h-[50px] rounded-lg items-center justify-center border border-border bg-input dark:bg-input/5",
        {
          "border-primary border-2": isActive,
          "border-destructive": isInvalid,
        },
        className,
      )}
    >
      {char !== null && (
        <Text className="text-2xl font-medium text-foreground">{char}</Text>
      )}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 28,
    borderRadius: 1,
  };

  return (
    <View className="absolute w-full h-full items-center justify-center">
      <Animated.View
        style={[baseStyle, animatedStyle]}
        className="bg-foreground"
      />
    </View>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };
