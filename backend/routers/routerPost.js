const EXPRESS = require("express");
const { jwtCheck } = require("../checkJWT");
const { hashPwd } = require("../hashPwd");
const router = EXPRESS.Router();
// postgreSQL;
const pool = require("../db");

// Add item nas tabelas!
router.post("/add/:table", jwtCheck, async(req, res) => {
    try {
        const { table } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;

            let {password} = req.body;
            password = hashPwd(password);

            const {email} = req.body;
            const {type_of_bold} = req.body;
            const type_user = 0;
    
            const addInTheTables = await pool.query(`
                INSERT INTO users (fname, lname, password, email, type_of_bold, type_user) VALUES ($1, $2, $3, $4, $5, $6)`,
                [ fname, lname, password, email, type_of_bold, type_user ]);
        } else if ( table == "packs" ){
            const {name}  = req.body;
            const {description}  = req.body;
            const {img_url}  = req.body;
            const {monthly_price}  = req.body;

            const addInTheTables = await pool.query(`
                INSERT INTO packs (name, description, img_url, monthly_price) VALUES ($1, $2, $3, $4)`,
                [ name, description, img_url, monthly_price ]);
        } else if ( table == "bags" ){
            const {id_pack} = req.body;
            const {signature_type} = req.body;
            const {id_user} = req.body;

            const addInTheTables = await pool.query(`
                INSERT INTO bags (id_pack, signature_type, id_user) VALUES ($1, $2, $3)`, 
                [ id_pack, signature_type, id_user ]);
        }

        res.json(`New data in ${table} was Add!`);
        console.log("post/add/:table");
    } catch (error) {
        console.log(error);
    }
})
router.post("/addnewuser/user", async(req, res) => {
    const {fname} = req.body;
    const {lname} = req.body;

    let { password } = req.body;
    password = hashPwd(password);

    const {email} = req.body;
    const {type_of_bold} = req.body;
    const type_user = 0;
    
    const addInTheTables = await pool.query(`
        INSERT INTO users (fname, lname, password, email, type_of_bold, type_user) VALUES ($1, $2, $3, $4, $5, $6)`,
        [ fname, lname, password, email, type_of_bold, type_user ]);
    console.log("post/addnewuser/user");
})

module.exports = router;