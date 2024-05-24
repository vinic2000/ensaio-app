import * as FileSystem from "expo-file-system";
import { database } from "../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { NativeModules } from "react-native";

export async function backup() {
  try {
    const data = await database.todosEnsaios();

    const dir = FileSystem.documentDirectory + "ensaio_backup/";

    const director = await FileSystem.getInfoAsync(dir);

    if (!director.exists) {
      await FileSystem.makeDirectoryAsync(dir);
    }

    const file = "backup.json";

    await FileSystem.writeAsStringAsync(dir + file, JSON.stringify(data));

    ToastAndroid.show("Arquivo salvo com sucesso", ToastAndroid.SHORT);
    console.log("Arquivo salvo com sucesso");
  } catch (error) {
    console.log(error);
  }
}

export async function restore() {
  try {
    const dir = FileSystem.documentDirectory + "ensaio_backup/";

    const file = "backup.json";

    const data = await FileSystem.readAsStringAsync(dir + file);

    await AsyncStorage.setItem("database", data);

    ToastAndroid.show("Backup recuperado", ToastAndroid.SHORT);

    console.log("Backup recuperado");
    NativeModules.DevSettings.reload();
  } catch (error) {
    console.log(error);
  }
}
