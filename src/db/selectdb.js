module.exports = {
    "tree_with_id" : `
    SELECT * FROM tree WHERE _id = ?
    `,
    "tree_with_p_id_key" : `
    SELECT * FROM tree WHERE p_id = ? AND \`key\` = ?
    `,
    "tree":`SELECT * FROM tree`
}