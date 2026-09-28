import { Text, type TextProps } from "react-native";
import { cn } from "@/lib/utils";

export function ThemedText({
  className,
  ...props
}: TextProps & { className?: string }) {
  return (
    <Text className={cn("font-sans text-foreground", className)} {...props} />
  );
}
