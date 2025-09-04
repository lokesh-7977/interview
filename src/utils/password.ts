import argon2 from "argon2";
import ApiError from "./apiError";
import { PasswordChecks } from "../types/auth.types";
import { ARGON2_CONFIG } from "../constants";
import { passwordSchema } from "../schemas/auth.schema";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await argon2.hash(password, ARGON2_CONFIG);
  } catch (error) {
    throw new ApiError("Password hashing failed", 500);
  }
};

export const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    throw new ApiError("Password verification failed", 500);
  }
};

export const checkPasswordStrength = (password: string) => {
  const result = passwordSchema.safeParse(password);

  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
    noCommonPatterns: !/(123|abc|password|admin)/i.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const strength = score < 3 ? "weak" : score < 5 ? "medium" : "strong";

  return {
    isValid: result.success,
    strength,
    score,
    checks,
    suggestions: result.success
      ? []
      : result.error.issues.map((issue) => issue.message),
  };
};

export const generatePasswordSuggestions = (
  checks: PasswordChecks
): string[] => {
  const suggestions: string[] = [];

  if (!checks.minLength) suggestions.push("Use at least 8 characters");
  if (!checks.hasUppercase) suggestions.push("Add uppercase letters");
  if (!checks.hasLowercase) suggestions.push("Add lowercase letters");
  if (!checks.hasNumber) suggestions.push("Add numbers");
  if (!checks.hasSpecialChar)
    suggestions.push("Add special characters (@$!%*?&)");
  if (!checks.noCommonPatterns) suggestions.push("Avoid common patterns");

  return suggestions;
};

export const generateSecurePassword = (length: number = 16): string => {
  const charset = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "@$!%*?&",
  };

  const allChars = Object.values(charset).join("");
  let password = "";

  password +=
    charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
  password +=
    charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
  password +=
    charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
  password +=
    charset.special[Math.floor(Math.random() * charset.special.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
