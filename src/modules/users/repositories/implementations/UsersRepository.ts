import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  findByEmail(email: string): User | undefined {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  turnAdmin(receivedUser: User): User {
    const newAdmin = this.findById(receivedUser.id);

    newAdmin.admin = true;

    newAdmin.updated_at = new Date();

    return newAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
