import User from "../../models/Users";
import { AppDataSource } from "../../data-source";
import { hash } from "bcryptjs";

interface UserDataParams {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
}

export default class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    age,
  }: UserDataParams): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;
    age ? (user.age = age) : user.age;

    return userRepository.save(user);
  }
}
