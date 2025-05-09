import { jwtSignFunc } from "../middleware/auth";
import hashPasswordFunc from "../libs/hash";

import UserRepositoryInstance from "../repository/userrepository";

class UserServices {
  static instance: UserServices;

  private constructor() {}

  static getInstance() {
    if (!UserServices.instance) {
      UserServices.instance = new UserServices();
    }
    return UserServices.instance;
  }

  registerUser = async (username: string, email: string, password: string) => {
    const hashPassword = hashPasswordFunc(password);
    try {
      
      await UserRepositoryInstance.createUser(username, email, hashPassword);

      const token = jwtSignFunc({
        email:email
      });

      return token;
    } catch (err: any) {
      throw err;
    }
  };

  loginUser = async (email: string, password: string) => {
    try {
      const user = await UserRepositoryInstance.getUser(email);
      if (!user) {
        throw new Error("User not found");
      }
      const userDbHashPassword = user.hashPassword;
      const hashPassword = hashPasswordFunc(password);
      if (hashPassword != userDbHashPassword) {
        throw new Error("Invalid password");
      }
      const token = jwtSignFunc(email);
      return token;
    } catch (error) {
      throw error;
    }
  };
}

export default UserServices.getInstance();
