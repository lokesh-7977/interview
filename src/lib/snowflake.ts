import SnowflakeId from "snowflake-id";
import { config } from "../config";

const snowflake = new SnowflakeId({
  mid: Number(config.SNOWFLAKE_MACHINE_ID) || 1,
  offset: new Date("2025-01-01T00:00:00Z").getTime(),
});


export const generateSnowflakeId = (): bigint => {
  return BigInt(snowflake.generate());
};

export const generateSnowflakeIdString = (): string => {
  return snowflake.generate().toString();
};
