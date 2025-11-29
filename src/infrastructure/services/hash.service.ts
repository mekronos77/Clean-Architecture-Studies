import argon2 from "argon2";

export class Cryptography {
  static async hash(input: { text: string }): Promise<string> {
    return await argon2.hash(input.text);
  }

  static async compare(input: { value: string; hash: string }): Promise<boolean> {
    return await argon2.verify(input.hash, input.value);
  }
}
