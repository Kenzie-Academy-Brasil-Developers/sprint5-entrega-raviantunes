import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/Users";
import CreateUserService from "../services/users/createUserService";
import DeleteUserService from "../services/users/deleteUserService";
import UpdateUserService from "../services/users/updateUserService";

class UserController {
  static async store(req: Request, res: Response) {
    const { name, email, password, age } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, age });

    delete user.password;

    return res.status(201).json(user);
  }

  static async index(req: Request, res: Response) {
    const productRepository = AppDataSource.getRepository(User);

    const users = await productRepository.find();

    return res.json(users);
  }

  static async showUser(req: Request, res: Response) {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(User);

    const user = await productRepository.findOne({ where: { id } });

    return res.json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, age } = req.body;

    const updateService = new UpdateUserService();

    const user = await updateService.execute({
      id: id,
      name,
      email,
      password,
      age,
    });

    return res.status(200).json(user);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteService = new DeleteUserService();

    await deleteService.execute({
      id: id,
    });

    return res.status(204).json();
  }
}

export default UserController;
