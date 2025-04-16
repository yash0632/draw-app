import crypto from "crypto"
const hashPasswordFunction = (password:string)=>{
    return crypto.createHash('sha256').update(password).digest('hex');
}
export default hashPasswordFunction