import express, { application } from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.js'
import gifRouter from './routes/gifs.js'
import { buildSchema } from 'graphql';
import { graphqlHTTP } from "express-graphql"

mongoose.connect('mongodb+srv://root:root@giphyapi.o3wilzu.mongodb.net/?retryWrites=true&w=majority');

const app = express();
const port = 3001 // react frontend app will run on port 3000

app.use(express.urlencoded({extended: false}));
app.use(express.json());

let users = [
    {
        id: 1,
        name: 'Greg',
        age: 21,
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Mike',
        age: 35,
        shark: 'Whale Shark'
    }
]

// return a single user
const getUser = function(args){
    const userId = args.id;

    let singleUser = users.filter(user => user.id == userId);
    let user = singleUser[0]
    return user

}

// return a list of users
const retrieveUsers = function() {
        console.log(users)
        return users;
}



// // initalize a graphql schema
// const helloWorldSchema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `)

// const userSchema = buildSchema(`
//     type User {
//         id: Int
//         username: String
//     }
// `)

const schema =  buildSchema(`
    type Query {
        user(id: Int!): Person
        users: [Person]
    },
    type Person {
        id: Int
        name: String
        age: Int
        shark: String
    }
`)

// we need to have a resolver
const root = {
    user: getUser,
    users: retrieveUsers
}


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

app.use('/graphql', graphqlHTTP({
    schema: schema, // This must be provided
    rootValue: root,
    graphiql: true  // enables the grpahql server end to be accessible in the browser
}));

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




