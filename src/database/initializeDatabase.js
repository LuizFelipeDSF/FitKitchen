export async function initializeDatabase(database) {
   try {
    
    await database.execAsync(`
        
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     nome TEXT,
     email TEXT NOT NULL UNIQUE,
     senha TEXT NOT NULL DEFAULT 'A123456!',
     role TEXT NOT NULL DEFAULT 'USER',
     created_at DATE DEFAULT CURRENT_TIMESTAMP,
     updated_at DATE
    );
    
    INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456!', 'SUPER');
    INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456!', 'ADMIN');
    INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456!', 'USER');

    `);

   } catch (error) {
    console.log(error);
   }
}