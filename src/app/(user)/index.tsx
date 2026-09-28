import { ThemeSwitch } from "@/components/ThemeSwitch";
import { ThemedText } from "@/lib/ui/ThemedText";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="bg-background flex-1 items-center justify-center">
      <ThemedText>Welcome to ToggleCalendar</ThemedText>
      <ThemeSwitch />
    </View>
  );
}
