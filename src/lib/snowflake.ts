import SnowflakeId from 'snowflake-id';

const snowflake = new SnowflakeId({
  mid: 42,
  offset: (2025 - 1970) * 31536000 * 1000
});

export const createSnowflakeId = (): bigint => {
  const id = snowflake.generate();
  return typeof id === 'string' ? BigInt(id) : BigInt(id);
};
