import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpHeader } from "@/components/otp/OtpHeader";
import { OtpForm } from "@/components/otp/OtpForm";
import { OtpFooter } from "@/components/otp/OtpFooter";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [shouldDisableInput, setShouldDisableInput] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-1 justify-center px-6 gap-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OtpHeader email={email} />
        <OtpForm email={email} shouldDisableInput={shouldDisableInput} />
        <OtpFooter
          setShouldDisableInput={setShouldDisableInput}
          email={email}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
