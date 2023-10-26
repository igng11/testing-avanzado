import { userDao } from "../dao/index.js";

export class UserService{
    static getUserByEmail = async(email)=>{
        return await userDao.getByEmail(email);
    };

    static saveUser = async(newUser)=>{
        return await userDao.save(newUser);
    };

    static getUserById = async(userId)=>{
        return await userDao.getById(userId);
    }

    static updateUser = async(userId,userInfo)=>{
        return await userDao.update(userId,userInfo);
    };
};