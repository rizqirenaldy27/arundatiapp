import {Request, Response} from "express"
import bcrypt from 'bcryptjs'
import userModel from "../models/userModel"

class userController {
    constructor() {
        
    }

    create = async (req:Request, res:Response): Promise<Response> => {
        let input = req.body


        let salt = await bcrypt.genSalt(11)
        let password = bcrypt.hashSync(input.password, salt)
        input.password = password

        try {
            await userModel.create(input)
        } catch (error) {
            return res.send({status:false,message:"Error create user"})
        }

        let response = {
            status: true,
            message: "User created"
        }

        return res.send(response)
    }

    update = async (req:Request, res:Response): Promise<Response> => {
        let input = req.body
        let id = req.params.id

        if (input.hasOwnProperty("password")) {
            let salt = await bcrypt.genSalt(11)
            let password = bcrypt.hashSync(input.password, salt)
            input.password = password
        }

        try {
            let dataCheck = await userModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"User not found"})
            }
        } catch (error) {
            return res.status(400).send({status:false,message:"User not found"})
        }

        try {
            await userModel.updateOne({_id: id}, input)
        } catch (error) {
            return res.status(400).send({status:false,message:"Error update user"})
        }

        let response = {
            status: true,
            message: "User updated"
        }

        return res.send(response)
    }

    readByID = async (req:Request, res:Response): Promise<Response> => {
        let id = req.params.id

        try {
            let dataCheck = await userModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"User not found"})
            }
            return res.send(dataCheck)
        } catch (error) {
            return res.status(400).send({status:false,message:"User not found"})
        }
    }

    read  =async (req:Request, res:Response): Promise<Response> => {
        let query = req.query
        let queryName = {}
        if (query.hasOwnProperty("name")) {
            if (query.name != "" && query.name != undefined) {
                queryName = {
                    name: query.name
                }
            }
        }
        
        let userData = await userModel.where(queryName).exec()

        let response = {
            status: true,
            data: userData
        }

        return res.send(response)
    }

    delete = async (req:Request, res:Response): Promise<Response> => {
        let input = req.body
        let id = req.params.id

        if (input.hasOwnProperty("password")) {
            let salt = await bcrypt.genSalt(11)
            let password = bcrypt.hashSync(input.password, salt)
            input.password = password
        }

        try {
            let dataCheck = await userModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"User not found"})
            }
        } catch (error) {
            return res.status(400).send({status:false,message:"User not found"})
        }

        try {
            await userModel.deleteOne({_id: id})
        } catch (error) {
            return res.status(400).send({status:false,message:"Error update user"})
        }

        let response = {
            status: true,
            message: "User deleted"
        }

        return res.send(response)
    }
}

export default new userController()