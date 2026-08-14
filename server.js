const express = require('express');
const app = express();
const port = 3000;


const pool = require("./config/database");

app.use(express.json());


app.use(express.static("public"));

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

app.delete("/api/delete/:id", async (req,res)=>{

    try{
        const id = req.params.id;
        const result = pool.query("DELETE FROM sample WHERE id = $1", [id]);
        res.json({
            message:`succesfully deleted`,
            deleted: result.rowCount,
        })
    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "failed to delete"
        })
    }
})

// app.delete("/api/deleteMany",(req,res)=>{
//     try{
//     const result = pool.query("DELETE FROM sample WHERE name ='' ")
//     res.status(200).json({
//         message: "succefully deleted",
//         delete: result.rowCount
//     })
//     }catch (error){
//         console.error(error);
//         res.status(500).json({
//             message: "failed to delete"
//         })
//     }
// })


app.listen(port,()=>{
    console.log(`server is running in ${port}`);
    console.log("http://localhost:3000")
})
