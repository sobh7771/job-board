export class PasswordHashingError extends Error {
  constructor() {
    super('Failed to hash password');
    this.name = 'PasswordHashingError';
  }
}

export class SessionCreationError extends Error {
  constructor() {
    super('Failed to create session');
    this.name = 'SessionCreationError';
  }
}
