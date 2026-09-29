import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { cn } from "@/lib/utils";

export const Spinner = ({
  className,
  size = "small",
  ...props
}: ActivityIndicatorProps) => {
  return (
    <ActivityIndicator
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      size={size}
      className={cn("text-primary-foreground", className)}
      {...props}
    />
  );
};
