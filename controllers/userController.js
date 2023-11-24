const bcrypt = require('bcrypt');
const { User: UserModel } = require("../models/User")

const userController = {
    create: async (req, res) => {
        try {
            const {
                nm_usuario,
                login,
                senha,
                cpf,
                email,
                telefone,
                dt_nasc,
                dt_val_licenca,
            } = req.body;
            console.log(nm_usuario,login,senha,cpf,email,telefone,dt_nasc,dt_val_licenca)

            const hashedPassword = await bcrypt.hash(senha, 10);

            const user = {
                nm_usuario,
                login,
                senha: hashedPassword,
                cpf,
                email,
                telefone,
                dt_nasc,
                dt_val_licenca,
            };

            const response = await UserModel.create(user);

            res.status(201).json({ response, msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Erro ao criar usuário.' });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)
            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }

            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)
            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({ deletedUser, msg: "Usuário deletado com sucesso!" })
        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            const existingUser = await UserModel.findById(id);

            if (!existingUser) {
                res.status(404).json({ msg: 'Usuário não encontrado.' });
                return;
            }

            // Atualiza os campos desejados
            existingUser.nm_usuario = req.body.nm_usuario || existingUser.nm_usuario;
            existingUser.login = req.body.login || existingUser.login;
            existingUser.cpf = req.body.cpf || existingUser.cpf;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.telefone = req.body.telefone || existingUser.telefone;
            existingUser.dt_nasc = req.body.dt_nasc || existingUser.dt_nasc;
            existingUser.dt_val_licenca = req.body.dt_val_licenca || existingUser.dt_val_licenca;

            if (req.body.senha) {
                const hashedPassword = await bcrypt.hash(req.body.senha, 10);
                existingUser.senha = hashedPassword;
            }

            const updatedUser = await existingUser.save();

            res.status(200).json({ updatedUser, msg: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Erro durante a atualização do usuário.' });
        }
    },

    login: async (req, res) => {
        try {
            const { login, senha } = req.body;

            const user = await UserModel.findOne({ login });

            if (!user) {
                console.log('Usuário não encontrado.');
                return res.status(400).send('Usuário não encontrado');
            }

            const isPasswordMatch = await user.comparePassword(senha);

            if (isPasswordMatch) {
                res.send('Login realizado com sucesso');
            } else {
                console.log('Senha incorreta.');
                res.status(401).send('Usuário ou senha incorreta');
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            res.status(500).send('Erro durante o login. Por favor, tente novamente.');
        }
    },

};

module.exports = userController;