import sqlite3 from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDirectory = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory);
}

const dbPath = path.join(dbDirectory, 'database.sqlite');

const db = new sqlite3(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        available BOOLEAN NOT NULL
    )
`).run();

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
}

export const query = <T>(sql: string, params: unknown[] = []): T[] => {
    return db.prepare(sql).all(params) as T[];
};

export const run = (sql: string, params: unknown[] = []) => {
    return db.prepare(sql).run(...params);
};

export default db;
