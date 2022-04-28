const EXPRESS = require("express");
const { jwtCheck, jwtCheckAdmin } = require("../checkJWT");
const { hashPwd, comparePwd } = require("../hashPwd");
const router = EXPRESS.Router();

// postgreSQL;
const pool = require("../db");

router.get("/search/cart/:id", jwtCheck, async(req, res) => {
    //  SELECT id_user, signature_type, id_pack, name, description, img_url, monthly_price FROM bags INNER JOIN packs ON id_pack = packs.id WHERE id_user = 10;
    try {
        const {id} = req.params;        

        const searchCart = await pool.query(
            `SELECT bags.id, id_user, signature_type, id_pack, name, description, img_url, monthly_price FROM bags INNER JOIN packs ON id_pack = packs.id WHERE id_user = ($1)`,
            [ id ]);

        res.json(searchCart.rows);        

    } catch (error) {
        console.log(error);
    }
});

router.get('/profilepage/:id', async(req, res) =>{
    try {
        const {id} = req.params;        

        const searchCart = await pool.query(
            `SELECT users.id, signature_name, signature_type, name, description, img_url, monthly_price FROM users INNER JOIN packs ON name = users.signature_name WHERE users.id = ($1);`,
            [ id ]);

        res.json(searchCart.rows);     
        

    } catch (error) {
        console.log(error);
    }
});

router.get("/packs", async(req, res) => {
    try {
        const searchTables = await pool.query(
            `SELECT * FROM packs ORDER BY id`);

        res.json(searchTables.rows);

        console.log(`Gotcha`);

    } catch (error) {
        console.log(error);
    }
});
// pesquisar nas tabelas
router.get("/search/:table", jwtCheck, async(req, res) => {
    try {
        const { table } = req.params;

        if(table == "user") return res.send("Nope")

        const searchTables = await pool.query(
            `SELECT * FROM ${table} ORDER BY id`);

        res.json(searchTables.rows);

        console.log(`Gotcha`);

    } catch (error) {
        console.log(error);
    }
});
// pesquisar nas tabelas por ID;
router.get("/search/:table/:id", jwtCheck, async(req, res) => {
    try {
        const { table } = req.params;
        const { id } = req.params;

        if(table == "user") return res.send("Nope");

        const searchTables = await pool.query(
            `SELECT * FROM ${table} WHERE id = ($1)`, 
            [id]);

        res.json(searchTables.rows);

        console.log(`Gotcha`);

    } catch (error) {
        console.log(error);
    }
});
// update item nas tabelas pelo ID;
router.put("/update/:table/:id", jwtCheck, async(req, res)=> {
    try {
        const { table } = req.params;
        const { id } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;
            const {password} = req.body;
            const {email} = req.body;
            const {type_of_bold} = req.body;
            const {signature_name} = req.body;
            const {signature_type} = req.body;

            password = hashPwd(password);
    
            const updateTables = await pool.query(`
                UPDATE users SET fname = $1, lname = $2, password = $3, email = $4, type_of_bold = $5, signature_name =  $6, signature_type = $7 WHERE id = $8;`,
                [ fname, lname, password, email, type_of_bold, signature_name, signature_type, id]);

            console.log("Done!");
        } else if ( table == "packs" ){
            const {name}  = req.body;
            const {description}  = req.body;
            const {img_url}  = req.body;
            const {monthly_price}  = req.body;

            const updateTables = await pool.query(`
                UPDATE packs SET name = ($1), description = ($2), img_url  = ($3), monthly_price = ($4) WHERE id = ($5);`,
                [ name, description, img_url, monthly_price, id]);

            console.log("Done!");
        } else if ( table == "bag" ){
            const {id_pack} = req.body;
            const {signature_type} = req.body;
            const {id_user} = req.body;

            const updateTables = await pool.query(`
                UPDATE bag SET id_pack = ($1), signature_type = ($2), id_user = ($3)  WHERE id = ($4);`, 
                [ id_pack, signature_type, id_user, id]);

            console.log("Done!");
        }

        res.json(`ID = ${id} in ${table} was Updated!`);
    } catch (error) {
        console.log(error);
    }
});
// 
router.put("/updateonly/users/:id", jwtCheck, async(req, res)=> {
    try {
        const { id } = req.params;

        const {signature_name} = req.body;
        const {signature_type} = req.body;
    
        const updateTables = await pool.query(`
            UPDATE users SET  signature_name = ($1), signature_type = ($2) WHERE id = ($3);`,
            [ signature_name, signature_type, id]);

        res.json(`ID = ${id} in users was Updated!`);
    } catch (error) {
        console.log(error);
    }
});
// 
// Add item nas tabelas!
router.post("/add/:table", jwtCheck, async(req, res) => {
    try {
        const { table } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;
            const {password} = req.body;
            const {email} = req.body;
            const {type_of_bold} = req.body;
            const type_user = 1;

            password = hashPwd(password);
    
            const addInTheTables = await pool.query(`
                INSERT INTO users (fname, lname, password, email, type_of_bold, type_user) VALUES ($1, $2, $3, $4, $5, $6)`,
                [ fname, lname, password, email, type_of_bold, type_user ]);

            console.log("Done!");
        } else if ( table == "packs" ){
            const {name}  = req.body;
            const {description}  = req.body;
            const {img_url}  = req.body;
            const {monthly_price}  = req.body;

            const addInTheTables = await pool.query(`
                INSERT INTO packs (name, description, img_url, monthly_price) VALUES ($1, $2, $3, $4)`,
                [ name, description, img_url, monthly_price ]);

            console.log("Done!");
        } else if ( table == "bags" ){
            const {id_pack} = req.body;
            const {signature_type} = req.body;
            const {id_user} = req.body;

            const addInTheTables = await pool.query(`
                INSERT INTO bags (id_pack, signature_type, id_user) VALUES ($1, $2, $3)`, 
                [ id_pack, signature_type, id_user ]);

            console.log("Done!");
        }

        res.json(`New data in ${table} was Add!`);
    } catch (error) {
        console.log(error);
    }
})
router.post("/addnewuser/user", async(req, res) => {
    const {fname} = req.body;
    const {lname} = req.body;
    let { password } = req.body;
    const {email} = req.body;
    const {type_of_bold} = req.body;
    const type_user = 0;
    
    password = hashPwd(password);

    const addInTheTables = await pool.query(`
        INSERT INTO users (fname, lname, password, email, type_of_bold, type_user) VALUES ($1, $2, $3, $4, $5, $6)`,
        [ fname, lname, password, email, type_of_bold, type_user ]);
})
// DELETE item nas tabelas, pelo id
router.delete("/delete/:table/:id", jwtCheck, async(req, res) => {
    try {
        const {table} = req.params;
        const {id} = req.params;

        const deleteIteminTheTables  = await pool.query(`
            DELETE FROM ${table} WHERE id = ($1)`,
            [ id ]);

        res.json(`Item ${id} from ${table} was deleted`)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;