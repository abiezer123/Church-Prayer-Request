const express = require('express');
const app = express();
const port = 3000;

const pool = require("./config/database");

app.use(express.json());

app.post("/api/prayer", async (req,res)=>{

    try{
        const {name,prayer} = req.body;
        const result = await pool.query(
            "INSERT INTO sample (name, prayer) VALUES ($1,$2)",[name, prayer]
        )

        res.status(201).json("successfully added")
    } catch (error){
        console.error(error);
        res.status(500).json("failed to add");
    }

    
    
})

app.get("/api/prayer", async (req,res)=>{
    

    try{
        const results = await pool.query(
        "SELECT * FROM sample"
        )
        console.log(results.rows);
        res.status(200).json(results.rows)
    }catch(error){
        console.error(error);
        res.status(500).json("failed to retrieved data");

    }
})

app.listen(port,()=>{
    console.log(`server is running in ${port}`);
})

















// const express = require("express")
// const app = express();
// const {Pool} = require("pg");


// app.use(express.json());

// const port = process.env.PORT || 3000;

// const pool = new Pool({
//     connectionString: "postgresql://postgres.qieahwjmupbkbitviudh:EmpireChurch123!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
// })

// pool.query("SELECT NOW()", (error, result) => {
//     if (error) {
//         console.error("DATABASE ERROR:", error);
//     } else {
//         console.log("DATABASE CONNECTED:", result.rows[0]);
//     }
// });

// app.get("/", (req, res) => {
//     res.json({
//         message: "Server is working!"
//     });
// });



// app.post("/api/prayer", async (req,res) =>{
//     try{ 
//         const {name, prayer} = req.body;
//         const result = await pool.query(
//             "INSERT INTO sample (name,prayer) VALUES ($1,$2) RETURNING * ", 
//             [name,prayer]
//         );

//         res.status(201).json(result.rows[0]);
//     } catch (error){

//         console.error(error);
//         res.status(500).json({
//             message: "unsuccessfull "
//         })
//     }
    

// })

// app.listen(port,()=>{
//     console.log(`sever is running at port ${port}`)
// });