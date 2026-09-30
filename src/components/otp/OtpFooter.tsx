import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { authClient } from "@/lib/auth-client";
import { ThemedText } from "@/lib/ui/ThemedText";
import { Spinner } from "@/lib/ui/Spinner";
import { useRouter } from "expo-router";

export const OtpFooter = ({
  setShouldDisableInput,
  email,
}: {
  setShouldDisableInput: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    setPending(true);
    setShouldDisableInput(true);

    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    setPending(false);
    setShouldDisableInput(false);

    if (error) {
      // surface with your toast solution
      console.warn("Failed to send verification code");
      return;
    }

    if (data) {
      // surface with your toast solution
      console.log("Email sent! Please check your inbox.");
    }

    setCountdown(60);
  };

  const resendDisabled = pending || countdown > 0;

  return (
    <View className="gap-8">
      <View>
        <View className="flex-row items-center justify-center flex-wrap gap-1">
          <ThemedText className="text-sm text-muted-foreground">
            No email? Check spam or
          </ThemedText>

          <Pressable
            onPress={handleResend}
            disabled={resendDisabled}
            hitSlop={8}
            className="flex-row items-center gap-1"
            style={{ opacity: resendDisabled ? 0.5 : 1 }}
          >
            {pending && <Spinner size={14} />}
            <ThemedText
              className="text-sm font-semibold text-foreground"
              style={{ textDecorationLine: "underline" }}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => router.push("/(auth)/auth")}
          className="flex-row items-center justify-center gap-2 self-center py-2 px-3"
          hitSlop={8}
        >
          <ThemedText className="text-muted-foreground">Go Back</ThemedText>
        </Pressable>
      </View>
    </View>
  );
};
