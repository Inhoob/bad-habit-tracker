import React from "react";
import { View } from "react-native";

interface Props {
  h?: number;
  w?: number;
}

function Spacer({ h, w }: Props) {
  return (
    <View
      style={{
        height: h || "100%",
        width: w || "100%",
      }}
    />
  );
}

export default Spacer;
