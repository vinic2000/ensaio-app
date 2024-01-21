import { View } from "react-native";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

export default function Container({ children }: props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {children}
    </View>
  );
}
