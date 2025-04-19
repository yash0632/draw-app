import {IncomingMessage} from 'http'


declare module "http"{
    interface IncomingMessage{
        email?:string
    }
}