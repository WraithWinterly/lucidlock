import { create } from "zustand";

type EncryptionStore = {
  passkey: string | undefined;
  setPasskey: (passkey: string | undefined) => void;
  decrypt: (encrypted: string) => string;
  encrypt: (decrypted: string) => string;
};

const useEncryptionStore = create<EncryptionStore>((set, get) => ({
  passkey: undefined,
  setPasskey: (passkey: string | undefined) => set({ passkey }),
  decrypt: (encrypted: string) => {
    if (typeof get().passkey === "undefined") {
      throw new Error("Passkey is undefined");
    }
    return encrypted;
  },
  encrypt: (decrypted: string) => {
    if (typeof get().passkey === "undefined") {
      throw new Error("Passkey is undefined");
    }
    return decrypted;
  },
}));

export default useEncryptionStore;
