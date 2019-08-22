import { Request, Response, Router } from 'express';
import User from '../models/user.model';

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getUsersList(req: Request, res: Response) {
        const users = await User.find();
        res.json(users);
    }

    public async getUserById(req: Request, res: Response) {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    }

    public async createUser(req: Request, res: Response) {
        const userData = req.body;

        const user = new User({
            UserName: userData.UserName,
            Email: userData.Email,
            Phone: userData.Phone,
            Image: userData.Image,
            Password: userData.Password,
            Active: userData.Active,
            CreateDate: userData.CreateDate,
        });

        await user.save().then(() => {
            res.json({ data: user })
        }).catch(err => {
            res.statusCode = 500;
            res.json({ error: err });
        });
    }

    public async updateUser(req: Request, res: Response) {
        const _id = req.params.id;
        const user = await User.findOneAndUpdate({ _id }, req.body, { new: true });
        res.json(user);
    }

    public async deleteUser(req: Request, res: Response) {
        const _id = req.params.id;
        await User.findOneAndDelete({ _id });
        res.json({ message: "Usuario eliminado!" });
    }

    routes() {
        this.router.get('/', this.getUsersList);
        this.router.get('/:id', this.getUserById);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;