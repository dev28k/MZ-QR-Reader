import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-elements";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setValues(data);
    console.log(values);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "40%",
          marginTop: "-9%",
          flexDirection: "row",
          marginBottom: "2%",
        }}
      >
        <AntDesign
          name="infocirlceo"
          size={20}
          color="purple"
          style={{ marginTop: "2%" }}
        />
        <Text
          style={{
            marginLeft: "5%",
            justifyContent: "center",
            alignSelf: "center",
            fontSize: 21,
          }}
        >
          Scan QR Code
        </Text>
      </View>

      <View style={styles.scannerWrapper}>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        {values ? <Text>{values}</Text> : null}
      </View>

      <Card
        style={{
          alignItems: "center",
          width: "90%",
          height: "30%",
          marginTop: "1.5%",
          backgroundColor: "#548999",
        }}
      >
        <TextInput placeholder="label1" />
        <TextInput placeholder="label1" />
        <TextInput placeholder="label1" />
        <TextInput placeholder="label1" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#89b4c4",
    alignItems: "center",
    justifyContent: "center",
  },
  scannerWrapper: {
    height: 300,
    overflow: "hidden",
  },
  scanner: {
    height: 500,
    width: 500,
  },
});
