const UserController = require('../controller/user')

class UserApi {

    async findUser(req, res) {
        console.log("api", req.session)
        try {
            const users = await UserController.findAll()

            res.send({ users })
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    async createUser(req, res) {
        const { name, email, password, role = 'viewer' } = req.body; 
    
        try {
            const user = await UserController.createUser(name, email, password, role);
            return res.status(201).send(user);
        } catch (e) {
            console.log(e);
            res.status(400).send('Deu erro');
        }
    }
    

    async updateUser(req, res) {
        const { id } = req.params
        const { name, email, password } = req.body

        try {
            const user = await UserController.update(Number(id), name, email, password)
            return res.status(200).send(user)
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        try {
            await UserController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        try {
            const token = await UserController.login(email, password)

            res.send({ token })
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }
}

module.exports = new UserApi()