import { Button, Text } from "react-native-paper";

import { StyleSheet, ToastAndroid } from "react-native";
import { backup, restore } from "../../service/backup/backup.service";

export default function Config() {
  return (
    <>
      <Text style={style.text}>Backup e restauração</Text>

      <Button
        mode="contained"
        style={style.button}
        onPress={async () => await backup()}
      >
        Backup
      </Button>
      <Button
        mode="contained"
        style={style.button}
        onPress={async () => await restore()}
      >
        Restaurar
      </Button>
    </>
  );
}

const style = StyleSheet.create({
  button: {
    marginTop: 5,
    borderRadius: 0,
  },

  text: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
  },
});
