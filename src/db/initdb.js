module.exports = [
    /*  TYPES
        NULL    : 0
        BOOL    : 1
        NUMBER  : 2
        STRING  : 3
    */
    `
    CREATE TABLE IF NOT EXISTS tree (
        _id  INTEGER NOT NULL UNIQUE,
        p_id INTEGER NOT NULL,
        type INTEGER NOT NULL,
        PRIMARY KEY (_id)
    );
    `,
    `
    CREATE INDEX IF NOT EXISTS tree_p_id_ind ON tree (p_id);
    `,
    `
    CREATE TABLE IF NOT EXISTS keys (
        _id  INTEGER NOT NULL UNIQUE,
        p_id INTEGER NOT NULL,
        \`key\`  TEXT,
        PRIMARY KEY (_id)
    );
    `,
    `
    CREATE UNIQUE INDEX IF NOT EXISTS key_p_id_keys ON keys (p_id, \`key\`);
    `,
    `
    CREATE TABLE IF NOT EXISTS \`values\` (
        _id     INTEGER NOT NULL UNIQUE,
        value   BLOB,
        PRIMARY KEY (_id)
    )
    `
]