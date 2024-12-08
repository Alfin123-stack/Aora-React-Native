import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { icons } from "../constants";
import ModalDialog from "./ModalDialog"; // Import ModalDialog

const ActionMenu = ({isSaved}) => {
  const [visible, setVisible] = useState(false); // Untuk kontrol visibilitas dialog
  const [dialogType, setDialogType] = useState(null); // Untuk menentukan jenis dialog

  // Menampilkan dialog sesuai jenisnya
  const showDialog = (type) => {
    setDialogType(type); // Set dialog type (Save / Delete)
    setVisible(true); // Menampilkan dialog
  };

  // Menyembunyikan dialog
  const hideDialog = () => {
    setVisible(false);
    setDialogType(null); // Reset jenis dialog setelah dialog ditutup
  };

  return (
    <View style={styles.menuContainer}>
      {/* Tombol Save */}
      <TouchableOpacity onPress={() => showDialog("save")}>
        <View style={styles.menuItem}>
          <Image
            source={icons.bookmark}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={styles.menuText}>Save</Text>
        </View>
      </TouchableOpacity>

      {/* Tombol Delete */}
      <TouchableOpacity onPress={() => showDialog("delete")}>
        <View style={styles.menuItem}>
          <Image source={icons.plus} resizeMode="contain" style={styles.icon} />
          <Text style={styles.menuText}>Delete</Text>
        </View>
      </TouchableOpacity>

      {/* ModalDialog */}
      <ModalDialog
      isSaved={isSaved}
        visible={visible}
        hideDialog={hideDialog}
        dialogType={dialogType} // Pass dialog type to ModalDialog
      />
    </View>
  );
};

export default ActionMenu;

const styles = {
  menuContainer: {
    backgroundColor: "#2d2d2d", // Background gelap untuk menu
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    position: "absolute",
    top: 64, // Posisi menu
    right: 20,
    shadowColor: "#000", // Efek shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Efek shadow untuk Android
    gap: 12, // Jarak antar item
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  menuText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600", // Teks bold
  },
};
