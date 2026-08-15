const express = require('express');
const app = express();
const port = 3000;


const pool = require("./config/database");

app.use(express.json());


app.use(express.static("public"));

app.post("/api/prayer", async (req,res)=>{

    try{
        const {name,prayer,visibility,date} = req.body;
        const newName = name.trim() === "" ? "Anonymous" : name;
        const result = await pool.query(
            "INSERT INTO prayers (name, prayer,visibility,created_at) VALUES ($1,$2,$3,$4)",[newName, prayer,visibility,date]
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
        "SELECT * FROM prayers"
        )
        console.log(results.rows);
        res.status(200).json(results.rows)
    }catch(error){
        console.error(error);
        res.status(500).json("failed to retrieved data");

    }
})

app.get("/api/prayerPublic", async (req,res)=>{
    try{
        const results = await pool.query("SELECT * FROM prayers WHERE visibility = 'public' ORDER BY created_at DESC");
        console.log(results.rows);
        res.status(200).json(results.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message : "failed to get data"
        })
    }
})

app.delete("/api/delete/:id", async (req,res)=>{

    try{
        const id = req.params.id;
        const result = pool.query("DELETE FROM prayers WHERE id = $1", [id]);
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
//     const result = pool.query("DELETE FROM Prayers WHERE name ='' ")
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
