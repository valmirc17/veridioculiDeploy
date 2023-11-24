const mongoose = require("mongoose")

async function main() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://valmir:O3HDxV9VB0WX29IS@veridioculi.qmtwnef.mongodb.net/")
        console.log("Conexão com o BD realizada com sucesso!")
    } catch (error) {
        console.log(`Erro:${error}`)
    }
}

module.exports = main