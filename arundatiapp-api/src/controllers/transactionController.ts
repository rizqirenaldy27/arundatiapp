import {Request, Response} from "express"
import bcrypt from 'bcryptjs'
import transactionModel from "../models/transactionModel"
import moment from "moment"

class transactionController {
    constructor() {
        
    }

    create = async (req:Request, res:Response): Promise<Response> => {
        let input = req.body

        let code = `TR${moment().unix()}`
        input.code = code

        let item = input.item
        let transaction_amount = 0
        let quantity = 0
        for (let index = 0; index < item.length; index++) {
            const element = item[index];

            let price = element.harga_product * element.quantity
            
            transaction_amount += price
            quantity += element.quantity
        }

        input.transaction_amount = transaction_amount
        input.quantity = quantity

        try {
            await transactionModel.create(input)
        } catch (error) {
            return res.send({status:false,message:"Error Transaction user"})
        }

        let response = {
            status: true,
            message: "Transaction created"
        }

        return res.send(response)
    }

    update = async (req:Request, res:Response): Promise<Response> => {
        let input = req.body
        let id = req.params.id


        try {
            let dataCheck = await transactionModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"Transaction not found"})
            }
        } catch (error) {
            return res.status(400).send({status:false,message:"Transaction not found"})
        }

        try {
            await transactionModel.updateOne({_id: id}, input)
        } catch (error) {
            return res.status(400).send({status:false,message:"Error update user"})
        }

        let response = {
            status: true,
            message: "Transaction updated"
        }

        return res.send(response)
    }

    readByID = async (req:Request, res:Response): Promise<Response> => {
        let id = req.params.id

        try {
            let dataCheck = await transactionModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"Transaction not found"})
            }
            return res.send(dataCheck)
        } catch (error) {
            return res.status(400).send({status:false,message:"Transaction not found"})
        }
    }

    read  =async (req:Request, res:Response): Promise<Response> => {
        let query = req.query
        let queryTransaction = {}
        if (query.hasOwnProperty("code")) {
            if (query.code != "" && query.code != undefined) {
                queryTransaction = {
                    code: query.code
                }
            }
        }
        
        let userData = await transactionModel.where(queryTransaction).exec()

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
            let dataCheck = await transactionModel.findOne({_id: id}).exec()

            if (!dataCheck) {
                return res.status(400).send({status:false,message:"Transaction not found"})
            }
        } catch (error) {
            return res.status(400).send({status:false,message:"Transaction not found"})
        }

        try {
            await transactionModel.deleteOne({_id: id})
        } catch (error) {
            return res.status(400).send({status:false,message:"Error update user"})
        }

        let response = {
            status: true,
            message: "Transaction deleted"
        }

        return res.send(response)
    }
}

export default new transactionController()