import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";

interface HeaderProps {
  artist: string;
}

export default ({ artist }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{artist}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: 20
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
