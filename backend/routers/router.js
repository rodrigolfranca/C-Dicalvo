const EXPRESS = require("express");
const router = EXPRESS.Router();

// postgreSQL;
const pool = require("./db");

// pesquisar nas tabelas
router.get("/search/:table", async(req, res) => {
    try {
        const { table } = req.params;

        if(table == "user") return res.send("Nope")

        const searchTables = await pool.query(
            `SELECT * FROM ${table}`);

        res.json(searchTables.rows);

        console.log(`Gotcha`);

    } catch (error) {
        console.log(error);
    }
});
// pesquisar nas tabelas por ID;
router.get("/search/:table/:id", async(req, res) => {
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
router.put("/update/:table/:id", async(req, res)=> {
    try {
        const { table } = req.params;
        const { id } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;
            const {password} = req.body;
            const {email} = req.body;
            const {type_of_bold} = req.body;
            const {id_bag} = req.body;
            const {signature_name} = req.body;
            const {signature_type} = req.body;
    
            const updateTables = await pool.query(`
                UPDATE users SET fname = $1, lname = $2, password = $3, email = $4, type_of_bold = $5, id_bag = $6, signature_name =  $7, signature_type = $8 WHERE id = $9;`,
                [ fname, lname, password, email, type_of_bold, id_bag, signature_name, signature_type, id]);

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

            const updateTables = await pool.query(`
            UPDATE bag SET id_pack = ($1), signature_type = ($2) WHERE id = ($3);`, 
            [ id_pack, signature_type, id]);

            console.log("Done!");
        }

        res.json(`ID = ${id} in ${table} was Updated!`);
    } catch (error) {
        console.log(error);
    }
});
// Add item nas tabelas!
router.post("/add/:table", async(req, res) => {
    try {
        const { table } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;
            const {password} = req.body;
            const {email} = req.body;
            const {type_of_bold} = req.body;
            const type_user = 1;
    
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
                [ name, description, img_url, monthly_price]);

            console.log("Done!");
        } else if ( table == "bag" ){
            const {id_pack} = req.body;
            const {signature_type} = req.body;

            const addInTheTables = await pool.query(`
                INSERT INTO bag (id_pack, signature_type) VALUES ($1, $2)`, 
                [ id_pack, signature_type]);

            console.log("Done!");
        }

        res.json(`New data in ${table} was Add!`);
    } catch (error) {
        console.log(error);
    }
})
// DELETE item nas tabelas, pelo id
router.delete("/delete/:table/:id", async(req, res) => {
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