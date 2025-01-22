declare module 'better-sqlite3' {
  class Database {
    constructor(path: string, options?: Database.Options);
    prepare<T = unknown>(sql: string): Database.Statement<T>;
    close(): void;
  }

  namespace Database {
    interface Options {
      memory?: boolean;
      readonly?: boolean;
      fileMustExist?: boolean;
    }

    class Statement<T = unknown> {
      all(...params: unknown[]): T[];
      get(...params: unknown[]): T | undefined;
      run(...params: unknown[]): Database.RunResult;
    }

    interface RunResult {
      changes: number;
      lastInsertRowid: number;
    }
  }

  export = Database;
}
