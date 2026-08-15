const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

const app = express();

const pool = require("./config/database");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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

app.patch("/api/prayer/:id/pray", async (req, res) => {

    try {

        const { id } = req.params;

        console.log("Pray request for ID:", id);

        const result = await pool.query(
            `UPDATE prayers
             SET pray_count = COALESCE(pray_count, 0) + 1
             WHERE id = $1
             RETURNING pray_count`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Prayer not found"
            });
        }

        console.log("New count:", result.rows[0].pray_count);

        res.json({
            pray_count: result.rows[0].pray_count
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to pray"
        });
    }
});

app.delete("/api/delete/:id", async (req,res)=>{

    try{
        const id = req.params.id;
        const result = await pool.query("DELETE FROM prayers WHERE id = $1", [id]);
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
//     const result = awati pool.query("DELETE FROM Prayers WHERE name ='' ")
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


// app.listen(port,()=>{
//     console.log(`server is running in ${port}`);
//     console.log("http://localhost:3000")
// })


module.exports = app;