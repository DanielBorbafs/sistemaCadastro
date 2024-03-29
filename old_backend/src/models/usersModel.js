const connection = require('./connection')

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM users');
    return users;
}

const createUser = async (users) => {
    const { nome } = users;
    const dateUTC = new Date(Date.now()).toUTCString();
    query = 'INSERT INTO users(nome, statusProcesso, iniciado_em) VALUES(?, ?, ?)';

    const [createdUser] = await connection.execute(query, [nome, 'pendente', dateUTC ]);
    return {
        message: "Usuário criado com sucesso", 
        insertId: createdUser.insertId 
    }
}

const deleteUser = async(id) => {
    const removedUser = await connection.execute( 'DELETE FROM users WHERE id = ?',
    [id]);
    return removedUser;
};

const updateUser = async (id, user) => {
    const {nome, statusProcesso} = user;
    const query = "UPDATE users SET nome =?, statusProcesso =? WHERE id =?  ";

    const [updateUser] = await connection.execute(query, [nome, statusProcesso, id]);
    return updateUser
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
}