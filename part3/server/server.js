import express, { application } from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.js'
import gifRouter from './routes/gifs.js'

mongoose.connect('mongodb+srv://root:root@giphyapi.o3wilzu.mongodb.net/?retryWrites=true&w=majority');

const app = express();
const port = 3001 // react frontend app will run on port 3000

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// const db = {
//     items: [
//         {
//             item: 'bread',
//             cost: 5
//         },
//         {
//             item: 'peanut butter',
//             cost: 20
//         },
//         {
//             item: 'jelly',
//             cost: 8
//         },
//     ],
//     users: [
//         {
//             username: 'Greg',
//             password: 'password'
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send('<html><body><h1>Hello World by Greg Lindeman</h1></body></html>')
})

// app.get('/users', (req, res) => {
//     res.json(db.users)
// })

// app.get('/items', (req, res) => {
//     res.json(db.items)
// })

app.use('/auth', authRouter);
app.use('/gifs', gifRouter)

app.listen(port, () =>{
    console.log(`app is listening on port ${port}`)
})


