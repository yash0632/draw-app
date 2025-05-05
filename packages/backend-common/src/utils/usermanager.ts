import { RedisClientType, createClient } from "redis";
class UserManager {
  private static instance: UserManager;
  #client: RedisClientType;

  private constructor() {
    this.#client = createClient({ url: "redis://localhost:6379" });
  }

  static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  connectClient = async () => {
    await this.#client.connect();
  };

  addUserNameWithUserId = async (userId: number, userName: string) => {
    await this.#client.hSet(userName, {
        'userId':userId
    });
  };

  getUserIdWithUserName = async (userName: string) => {
    const userId = await this.#client.hGet(userName,'userId');
    return userId;
  };

  removeUserNameWithUserId = async (userId: number, userName: string) => {
    await this.#client.hDel(userName,'userId');
  };

  adduserIdWithRoomId = async(userId:number,roomId:number)=>{
    await this.#client.hSet(userId.toString(),{
        'roomId':roomId
    })
  }

  getRoomIdWithuserId = async(userId:number)=>{
    const roomId = await this.#client.hGet(userId.toString(),'roomId');
    return roomId;
  }

  removeuserIdWithRoomId = async(userId:number,roomId:number)=>{
    await this.#client.hDel(userId.toString(),'roomId');
  }
}
