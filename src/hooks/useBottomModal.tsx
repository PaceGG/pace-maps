// import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export function useBottomModal() {
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => setIsVisible(true), []);
  const close = useCallback(() => setIsVisible(false), []);

  const BottomModal = useMemo(() => {
    return function ModalComponent({
      children,
      title,
    }: PropsWithChildren<{ title: string }>) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={close}
        >
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalOverlay} onPress={close} />
            <View style={styles.modalContent}>
              <View style={styles.titleContainer}>
                <Text>{title}</Text>
                <Pressable onPress={close}>
                  {/* <Entypo name="cross" size={rem(2)} /> */}
                  <Text>X</Text>
                </Pressable>
              </View>
              {children}
            </View>
          </View>
        </Modal>
      );
    };
  }, [isVisible, close]);

  return { BottomModal, open, close, isVisible };
}

const styles = StyleSheet.create({
  modalOverlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: colors.background,
    borderTopRightRadius: rem(1.1),
    borderTopLeftRadius: rem(1.1),
  },
  titleContainer: {
    backgroundColor: colors.background,
    borderTopRightRadius: rem(1),
    borderTopLeftRadius: rem(1),
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingHorizontal: rem(1),
    paddingVertical: rem(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
