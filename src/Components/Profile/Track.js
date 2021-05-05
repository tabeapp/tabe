import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Track } from "./Model";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Words from '../Simple/Words';


export default ({ track, artist, index }) => (
    <View style={styles.row}>
        <View style={styles.cell}>
            <Text style={styles.index}>{index}</Text>
        </View>
        <View style={[styles.cell, { flex: 1 }]}>
            <Text style={styles.name}>{track.name}</Text>
            <Text style={styles.artist}>{track.artist || artist}</Text>
        </View>
        <View style={styles.cell}>
            <Words>

                <Ionicons name="add" color="#b2b3b4" size={24} />
            </Words>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: "black",
    },
    cell: {
        padding: 16,
        justifyContent: "center",
    },
    index: {
        color: "#b2b3b4",
    },
    artist: {
        color: "#b2b3b4",
    },
    name: {
        color: "white",
    },
});
