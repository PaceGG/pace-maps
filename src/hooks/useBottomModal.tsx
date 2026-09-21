import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function useBottomModal() {
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => setIsVisible(true), []);
  const close = useCallback(() => setIsVisible(false), []);

  const BottomModal = useMemo(() => {
    return function ModalComponent({
      children,
      title,
      onClose = close,
    }: PropsWithChildren<{ title: string; onClose?: () => void }>) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={close}
        >
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior="padding"
          >
            <Pressable style={styles.modalOverlay} onPress={onClose} />
            <View style={styles.modalContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Pressable onPress={onClose}>
                  {/* <Entypo name="cross" size={rem(2)} /> */}
                  <Text>X</Text>
                </Pressable>
              </View>
              {children}
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
    };
  }, [isVisible, close]);

  return { BottomModal, open, close, isVisible };
}

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFill,
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
    // Рекомендуется задать максимальную высоту, чтобы контент не улетал за пределы экрана при открытой клавиатуре
    maxHeight: "90%",
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
  title: { fontSize: rem(1.5), color: colors.foreground },
});
