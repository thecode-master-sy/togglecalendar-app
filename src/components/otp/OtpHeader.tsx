import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";
import { Check, Copy, Mail } from "@/lib/lucide/icons";
import { ThemedText } from "@/lib/ui/ThemedText";

const ENTER_DURATION = 600;

export const OtpHeader = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync(email);
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View className="items-center">
      <Animated.View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
        <Mail size={20} strokeWidth={2} className="text-[#9896ff]" />
      </Animated.View>

      <Animated.View>
        <ThemedText className="text-xl font-semibold text-center">
          {"We've emailed you a verification code"}
        </ThemedText>
      </Animated.View>

      <Animated.View className="mt-2 items-center gap-1">
        <ThemedText className="text-muted-foreground text-center">
          Check your email
        </ThemedText>

        <View className="flex-row items-center gap-1 px-1">
          <ThemedText className="font-medium text-foreground text-center shrink">
            ({email})
          </ThemedText>

          <Pressable
            onPress={handleCopyEmail}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={copied ? "Email copied" : "Copy email"}
            className="h-6 w-6 items-center justify-cente"
          >
            {copied ? (
              <Check size={14} className="text-[#22c55e]" />
            ) : (
              <Copy size={14} className="text-foreground" />
            )}
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};
