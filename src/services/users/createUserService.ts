import User from "../../models/Users";
import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";

interface UserDataParams {
  name: string;
  email: string;
  password: string;
  age: number;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    age,
  }: UserDataParams): Promise<User> {
    const userRepository = AppDataSource.manager.getRepository(User);

    const userAlreadyExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("This email is already being used");
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await userRepository.save(user);

    return user;
  }
}
