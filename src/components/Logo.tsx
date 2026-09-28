import { Image } from "expo-image";
import { View } from "react-native";

export function Logo() {
  return (
    <Image
      className="shadow-md"
      source={require("../../assets/togglecalendar.png")}
      style={{ width: 40, height: 40 }}
    />
  );
}
