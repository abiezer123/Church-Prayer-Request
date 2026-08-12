const { Pool } = require("pg");
require("dotenv").config();

//    console.log(process.env.POSTGRES_HOST)
//     console.log(process.env.POSTGRES_PORT)
//     console.log(process.env.POSTGRES_DATABASE)
//     console.log(process.env.POSTGRES_USER)
//     console.log(process.env.POSTGRES_PASSWORD)

const pool = new Pool({
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.qieahwjmupbkbitviudh",
    password: "Empire123456789012345690",
  
});
postgresql://postgres.qieahwjmupbkbitviudh:Empire123456789Church12@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
console.log("STARTING");

pool.connect()
    .then(client => {
        console.log("DATABASE CONNECTED!");

        return client
            .query("SELECT NOW()")
            .then(result => {
                console.log(result.rows[0]);
            })
            .finally(() => {
                client.release();
            });
    })
    .catch(error => {
        console.error("DATABASE CONNECTION FAILED");
        console.error(error);
    })
    .finally(() => {
        pool.end();
    });