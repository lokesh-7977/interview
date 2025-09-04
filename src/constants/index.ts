import argon2 from "argon2";

export const ARGON2_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1,
  saltLength: 16,
} as const;
