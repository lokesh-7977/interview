export * from "./auth";

import type { UsersTable } from "./auth";

export interface Database {
  users: UsersTable;
}
