import User from "../../models/Users";
import { AppDataSource } from "../../data-source";
import { DeleteResult } from "typeorm";

interface UserDataParams {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: UserDataParams): Promise<DeleteResult> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await userRepository.delete(id);
  }
}
