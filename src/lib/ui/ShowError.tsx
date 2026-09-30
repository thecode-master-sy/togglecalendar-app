import { View, Pressable } from "react-native";
import { toast } from "sonner-native";
import { AlertTriangle, X } from "@/lib/lucide/icons";
import { ThemedText } from "@/lib/ui/ThemedText";

export const showErrorToast = ({
  errorMessage,
  errorDetail,
}: {
  errorMessage?: string;
  errorDetail?: string;
}) => {
  toast.custom(
    <View
      className="flex-row m-4 items-center gap-2 bg-card rounded-2xl border border-red-500/50 p-4"
      accessibilityRole="alert"
    >
      {/* Icon */}
      <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />

      {/* Text Content */}
      <View className="flex-1 gap-1">
        {errorMessage && (
          <ThemedText className="font-semibold">{errorMessage}</ThemedText>
        )}
        {errorDetail && (
          <ThemedText className="text-sm text-muted-foreground">
            {errorDetail}
          </ThemedText>
        )}
      </View>

      {/* Close Button */}
      <Pressable
        onPress={() => toast.dismiss()}
        hitSlop={8}
        accessibilityLabel="Close"
        className="shrink-0 rounded-md p-1"
      >
        <X className="h-5 w-5 text-foreground" />
      </Pressable>
    </View>,
  );
};
