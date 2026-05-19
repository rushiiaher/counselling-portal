import CryptoJS from "crypto-js";
import { logger } from "./logger.service";

// We are migrating to a Versioned Key Architecture.
interface KeyConfig {
  version: number;
  keyPass: string;
  isActive: boolean;
}

export const getKeyConfig = (): KeyConfig[] => {
  const configs: KeyConfig[] = [];
  
  const v1Key = process.env.ENCRYPTION_KEY || "development_fallback_key_do_not_use_in_prod";
  configs.push({ version: 1, keyPass: v1Key, isActive: true });

  // For future rotation (e.g., adding v2):
  // if (process.env.ENCRYPTION_KEY_V2) {
  //   configs.push({ version: 2, keyPass: process.env.ENCRYPTION_KEY_V2, isActive: true });
  //   configs[0].isActive = false; // v1 falls back to decryption only
  // }

  return configs;
};

export const getActiveKey = (): KeyConfig => {
  const active = getKeyConfig().find(c => c.isActive);
  if (!active) throw new Error("No active encryption key found");
  return active;
};

export const getKeyByVersion = (version: number): KeyConfig => {
  const key = getKeyConfig().find(c => c.version === version);
  if (!key) throw new Error(`Encryption Key Error: Version ${version} missing`);
  return key;
};

// Legacy method for backwards compatibility, defaults to active key
export function encryptMessage(text: string): string {
  const active = getActiveKey();
  return CryptoJS.AES.encrypt(text, active.keyPass).toString();
}

// Defaults to v1, but supports explicit versioning
export function decryptMessage(ciphertext: string, version: number = 1): string {
  try {
    const keyConfig = getKeyByVersion(version);
    const bytes = CryptoJS.AES.decrypt(ciphertext, keyConfig.keyPass);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (!plaintext) throw new Error("Decryption payload empty");
    return plaintext;
  } catch (err) {
    logger.error("Failed to decrypt message.", err, { version });
    return "[Encrypted/Unreadable Content]";
  }
}

export function encryptWithVersion(text: string): { ciphertext: string, version: number } {
  const active = getActiveKey();
  const ciphertext = CryptoJS.AES.encrypt(text, active.keyPass).toString();
  return { ciphertext, version: active.version };
}
