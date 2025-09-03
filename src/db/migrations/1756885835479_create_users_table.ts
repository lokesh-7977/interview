import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'bigint', col => col.primaryKey())
    .addColumn('full_name',     'varchar(255)', col => col.notNull())
    .addColumn('email',         'varchar(320)', col => col.notNull().unique())
    .addColumn('password',      'text')
    .addColumn('role',          'varchar(32)',  col => col.notNull().defaultTo('USER'))
    .addColumn('bio',           'text')
    .addColumn('tagline',       'varchar(255)')
    .addColumn('profile_image', 'text')
    .addColumn('created_at',    'timestamptz',  col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at',    'timestamptz',  col => col.notNull().defaultTo(sql`now()`))
    .addColumn('deleted_at',    'boolean')
    .execute();

  await db.schema
    .createTable('accounts')
    .addColumn('id',          'bigint', col => col.primaryKey())
    .addColumn('user_id',     'bigint', col =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('provider',       'varchar(64)',  col => col.notNull())
    .addColumn('provider_id',    'varchar(255)', col => col.notNull())
    .addColumn('access_token',   'text')
    .addColumn('refresh_token',  'text')
    .addColumn('created_at',     'timestamptz',  col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at',     'timestamptz',  col => col.notNull().defaultTo(sql`now()`))
    .addColumn('deleted_at',     'boolean')
    .addUniqueConstraint('accounts_provider_uidx', ['provider', 'provider_id'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('accounts').execute();
  await db.schema.dropTable('users').execute();
}
