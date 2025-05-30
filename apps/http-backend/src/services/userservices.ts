import { jwtSignFunc } from "../middleware/auth";
import hashPasswordFunc from "../libs/hash";

import UserRepositoryInstance from "../repository/userrepository";
import logger from "@repo/backend-common/logger";

class UserServices {
  static instance: UserServices;

  private constructor() {}

  static getInstance() {
    if (!UserServices.instance) {
      UserServices.instance = new UserServices();
    }
    return UserServices.instance;
  }

  registerUser = async (username: string, email: string, password: string,avatarPhoto:string|undefined) => {
    const hashPassword = hashPasswordFunc(password);
    try {
      
      const user =await UserRepositoryInstance.createUser(username, email, hashPassword,avatarPhoto);

      const token = jwtSignFunc({
        email:email,
        userId:user.id
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
      const token = jwtSignFunc({email,userId:user.id});
      return token;
    } catch (error:any) {
      
      throw error;
    }
  };
}

export default UserServices.getInstance();
