const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(() => {
    console.log('----MongoDB Atlas Connected Successfully----')
}).catch((error) => {
    console.log('MongoDB Connection Error '+error);
})