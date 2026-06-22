const { prisma } = require("../prisma");
const bcrypt = require('bcryptjs');


interface IUserRequest{
    email: string,
    name: string,
    password: string
}

interface IUserUpdate{
    id: string,
    name?: string,
    email?: string,
}

interface IUserDelete{
    id: string
}

class UserService{

    async create({email, name, password}: IUserRequest) {
        const userExist = await prisma.user.findUnique({
            where: {email}
        });

        if(userExist){
            throw new Error("User Already Exist!")
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true
            }
        });

        return user;
        
    }

    async read(){
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        })
    }

    async update({id, name, email}:IUserUpdate){
        const userExist = prisma.user.findUnique({
            where: {id}
        })
        if(!userExist){
            throw new Error("User don't Exist")
        }
        if(email && email !=userExist.email){
            const emailExist = prisma.user.findUnique({
                where: {email}
            });
            if(emailExist){
                throw new Error("Email Already in Use")
            }

        }
        const userUpdate = prisma.user.update({
            where: {id},
            data: {name, email},
            select: {id: true, name: true, email: true}
        })
        return userUpdate;
    }

    async delete({id}: IUserDelete){
        const userExist = prisma.user.findUnique({
            where: {id}
        })
        if(!userExist){
            throw new Error("User dont't Exist")
        }
        const userDelete = prisma.user.delete({
            where: {id}
        })
        return userDelete;
    }
}

module.exports = {
    UserService: new UserService()
}