import { eq } from 'drizzle-orm';
import { Result, ResultAsync } from 'neverthrow';

import { UserNotFoundError, UserRepository, UserSaveError } from '@/domain/user/UserRepository';
import { db } from '@/lib/drizzle/db';
import { User, userTable } from '@/lib/drizzle/schema';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<Result<User | null, UserNotFoundError>> {
    return ResultAsync.fromPromise(
      db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email))
        .execute()
        .then((result) => (result.length > 0 ? (result[0] as User) : null)),
      () => new UserNotFoundError(),
    );
  }

  async save(user: User): Promise<Result<void, UserSaveError>> {
    return ResultAsync.fromPromise(
      db.insert(userTable).values(user).execute(),
      () => new UserSaveError(),
    ).map(() => undefined);
  }
}
