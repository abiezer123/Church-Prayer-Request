const pool = require("../config/database");

const getAllPrayers = async () =>{
    const result = await pool.query(
        "SELECT * FROM prayer_requests ORDER BY created_at DESC"
    )

    return result.rows;

}


module.exports = {getAllPrayers};