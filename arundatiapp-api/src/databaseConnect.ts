import mongoose from 'mongoose'

const databaseConnect = async () => {
    try {
        let dbUrl = 'mongodb://localhost:27017/arundatiApp'
        mongoose.set('strictQuery', true)
        await mongoose.connect(dbUrl)
        console.log('DB Connected')
    } catch (error:any) {
        console.log(error.message)
    }
}

export default databaseConnect