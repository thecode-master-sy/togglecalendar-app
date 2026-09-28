import { Image } from "expo-image";

export function GoogleIcon() {
  return (
    <Image
      source={require("../../assets/google-icon.svg")}
      style={{ width: 20, height: 20 }}
    />
  );
}
