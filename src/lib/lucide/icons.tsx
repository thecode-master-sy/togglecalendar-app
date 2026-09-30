import { cssInterop } from "nativewind";
import * as LucideIcons from "lucide-react-native";

const iconNames = [
  "ArrowLeft",
  "Mail",
  "Copy",
  "Check",
  "AlertTriangle",
  "X",
] as const;

iconNames.forEach((name) => {
  cssInterop(LucideIcons[name], {
    className: {
      target: "style",
      nativeStyleToProp: { width: true, height: true, color: true },
    },
  });
});

export const { ArrowLeft, Mail, Copy, Check, AlertTriangle, X } = LucideIcons;
