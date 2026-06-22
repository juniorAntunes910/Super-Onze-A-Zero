import type { Request, Response } from "express";
const { userService } = require("../services/UserService");

class UserController{

    async create(req: Request, res: Response){

        try{
        const { name, email, password } = req.body;
        const user = await userService.create({
            name,
            email,
            password
        });

        return res.status(201).json(user);
    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({error: error.message});
        }
        return res.status(400).json({error: "Internal Server Error"});
    }
    }

    async read(req: Request, res: Response){
        try{
            const users = await userService.read();
            return res.status(200).json(users);
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }
            return res.status(400).json({error: "Internal Server Error"});
        }
    }


    async update(req: Request, res: Response){
        try{
            const { id } = req.params;
            const { name, email } = req.body;
            const user = userService.update({id, name, email});
            return res.status(200).json(user);
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }
            return res.status(400).json({error: "Internal Server Error"});
        }
    }

    async delete(req: Request, res: Response){
        try{
            const { id } = req.params;
            const user = userService.delete({id});
            return res.status(200).json(user);
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }
            return res.status(400).json({error: "Internal Server Error"});
        }
    }



}


module.exports = {
    UserController: new UserController()
}