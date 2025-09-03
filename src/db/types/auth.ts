import { ColumnType } from "kysely";
import type { Role } from "./enums";

export interface UsersTable {
  id: bigint;
  fullName: string;
  email: string;
  password: string | null;
  role: Role;
  bio: string | null;
  tagline: string | null;
  profileImage: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, string>;
  deletedAt: boolean | null;
}

export interface AccountsTable {
  id: bigint;
  userId: bigint;
  provider: string;
  providerId: string;
  accessToken: string | null;
  refreshToken: string | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, string>;
  deletedAt: boolean | null;
}

export type NewUser = Omit<UsersTable, "id" | "createdAt" | "updatedAt">;
export type UserUpdate = Partial<Omit<NewUser, "email">>;
export type NewAccount = Omit<AccountsTable, "id" | "createdAt" | "updatedAt">;
export type AccountUpdate = Partial<
  Pick<AccountsTable, "accessToken" | "refreshToken">
>;
