import {Queue} from 'bullmq'

export interface IRedisManager {
    addJobsToQueue: (jobName:string,data: Object) => Promise<void>;
}


class RedisManager implements IRedisManager{
    #redisQueue: Queue

    constructor(queueName:string){
        this.#redisQueue = new Queue(queueName, {connection: {host: 'localhost', port: 6379,password:"eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"}});
    }
 
    addJobsToQueue = async(jobName:string,data: Object) => {
        await this.#redisQueue.add(jobName,data);
    }


}

export default RedisManager;