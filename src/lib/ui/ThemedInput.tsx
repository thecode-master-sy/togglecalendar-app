import { cn } from "@/lib/utils";
import { TextInput, type TextInputProps } from "react-native";
import React from "react";

type ThemedInputProps = TextInputProps & {
  className?: string;
  isInvalid?: boolean;
};

export const ThemedInput = React.forwardRef<TextInput, ThemedInputProps>(
  ({ className, isInvalid = false, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          "bg-input dark:bg-input/5 p-4 border font-sans placeholder:text-muted-foreground text-foreground",
          isInvalid ? "border-destructive" : "border-border",
          className,
        )}
        {...props}
      />
    );
  },
);

ThemedInput.displayName = "ThemedInput";
