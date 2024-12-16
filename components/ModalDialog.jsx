import { StyleSheet, Text, View } from "react-native";
import { Dialog, Portal, Button, Paragraph } from "react-native-paper"; // Import dari react-native-paper
import React from "react";
import { useAuth } from "../context/AuthContext";
import { addToSavedVideos, deleteFromSavedVideos } from "../lib/appwrite";

const ModalDialog = ({ visible, hideDialog, dialogType, isSaved, id }) => {
  const { user } = useAuth();
  return (
    <View>
      {/* Custom Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          {isSaved.length && dialogType === "save" ? (
            <>
              <Dialog.Title style={styles.dialogTitle}>
                Already Saved
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph style={styles.dialogTitle}>
                  This Video has been saved already
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Back</Button>
              </Dialog.Actions>
            </>
          ) : (
            <>
              <Dialog.Title style={styles.dialogTitle}>
                {dialogType === "save" ? "Save Video" : "Delete video"}
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph style={styles.dialogTitle}>
                  Do you want to {dialogType === "save" ? "save" : "delete"}{" "}
                  this video?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                {dialogType === 'save' ? <Button
                  onPress={() => {
                    addToSavedVideos(user.$id, id);
                  }}>
                  Yes
                </Button>: <Button
                  onPress={() => {
                    deleteFromSavedVideos(user.$id, id);
                  }}>
                  yes
                </Button>}
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Portal>
    </View>
  );
};

export default ModalDialog;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#2d2d2d", // Background dialog hitam
    borderWidth: 2, // Lebar border
    borderColor: "white", // Warna border putih
  },
  dialogTitle: {
    color: "white",
  },
});
