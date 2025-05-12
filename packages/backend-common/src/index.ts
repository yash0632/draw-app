import dotenv from 'dotenv'
import redisrepository from './utils/roommanager'
import client from "@repo/db/prismaclient"

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET || '123456'



import {Worker} from 'bullmq'
import IORedis from 'ioredis'


const connection = new IORedis({
maxRetriesPerRequest: null,
password : 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'})

const worker = new Worker (
    'draw-queue',
    async job => {
        if(job.name === 'chat'){
            console.log(job.data)
            const data = job.data;
            try{
                await client.chat.create({
                    data:{
                        message:data.chat,
                        userId:data.userId,
                        roomId:data.roomId
                    }

                })
            }catch(err){
                console.log(err)
            }
            
        }
    },
    {connection}
)