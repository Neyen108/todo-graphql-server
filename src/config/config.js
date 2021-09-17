require("dotenv").config();

const PORT = process.env.PORT;
const mongodbUri =
  "mongodb+srv://nayan:xtY3gt30Wl6TFQZS@cluster0.jc5no.mongodb.net/todoGraphQl?retryWrites=true&w=majority";

exports.PORT = PORT;
exports.mongodbUri = mongodbUri;
