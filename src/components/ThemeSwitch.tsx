import { useState } from "react";
import { Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";
import { ThemedText } from "@/lib/ui/ThemedText";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type Selection = (typeof OPTIONS)[number]["value"];

export function ThemeSwitch() {
  const { setColorScheme } = useColorScheme();
  const [selected, setSelected] = useState<Selection>("system");

  const handleSelect = (value: Selection) => {
    setSelected(value);
    setColorScheme(value);
  };

  return (
    <View className="flex-row rounded-lg border border-border p-1 bg-card">
      {OPTIONS.map((option) => {
        const isActive = selected === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => handleSelect(option.value)}
            className={cn(
              "flex-1 items-center rounded-md py-2",
              isActive && "bg-primary",
            )}
          >
            <ThemedText
              className={cn(
                "text-sm",
                isActive ? "text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
