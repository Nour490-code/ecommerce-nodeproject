import { Application, Request, Response } from 'express';
import UserStore, { UserInput } from '../models/user.model';
import { Role } from '../models/user.model';
const store = new UserStore();
const index = async (req: Request, res: Response) => {
  try {
    console.log('index');
    const users = await store.index();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await store.show(id).catch((e) => {
    console.log(e.message);
    res.json(e.message);
    return;
  });
  res.json(user);
};
const create = async (req: Request, res: Response) => {
  const user: UserInput = {
    name: req.body.name as string,
    email: req.body.email as string,
    phone: req.body.phone as string,
    password: req.body.password as string,
    role: req.body.role as Role,
    profileImg: req.body.profileImg as string,
    isActive: req.body.isActive as boolean,
    isVerified: req.body.isVerified as boolean,
    address: req.body.address as string
  };
  const newUser = await store.create(user);
  res.json(newUser);
};
const userRoutes = (app: Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};
export default userRoutes;
