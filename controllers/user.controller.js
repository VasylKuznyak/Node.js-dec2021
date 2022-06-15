const {fileService} = require("../services");

module.exports = {
    getAll: async (req, res) => {

        const users = await fileService.read();

        res.json(users);
    },

    createUser: async (req, res) => {

        const {name, age} = req.body;

        if (!name || name.length < 2) {
            return res.status(400).json('Enter valid name');
        }
        if (!age || !Number.isInteger(age)) {
            return res.status(400).json('Enter valid age');
        }

        const users = await fileService.read();

        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};

        res.status(201).json(`user ${name} was created`);

        await fileService.write([...users, newUser]);
    },

    getByID: async (req, res) => {

        const {userId} = req.params;

        const users = await fileService.read();

        const user = users.find((user) => user.id === +userId);

        if (!user) {
            return res.status(404).json(`not found user with id ${userId}`);
        }

        res.status(200).json(user);
    },

    deleteById: async (req, res) => {

        const {userId} = req.params;

        const users = await fileService.read();

        const index = users.findIndex((user) => user.id === +userId);
        if (index === -1) {
            return res.status(404).json(`not found user with id ${userId}`);
        }

        users.splice(index, 1);

        res.status(204).json(`user with id ${userId} was deleted`);

        await fileService.write(users);
    },

    updateById: async (req, res) => {

        const {name, age} = req.body;

        if (name.length < 2) {
            return res.status(400).json('Enter valid name');
        }
        if (!Number.isInteger(age)) {
            return res.status(400).json('Enter valid age');
        }
        const {userId} = req.params;

        const users = await fileService.read();

        const index = users.findIndex((user) => user.id === +userId);
        if (index === -1) {
            return res.status(404).json(`not found user with id ${userId}`);
        }

        const updatedUser = {...users[index], ...req.body};

        users.splice(index, 1);

        res.status(201).json(`user with id ${userId} successfully updated`);

        await fileService.write([...users, updatedUser]);

    }
}