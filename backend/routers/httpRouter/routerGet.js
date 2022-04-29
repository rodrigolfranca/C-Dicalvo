const EXPRESS = require("express");
const { jwtCheck } = require("../checkJWT");
const router = EXPRESS.Router();
// postgreSQL;
const pool = require("../db");

router.get("/searchString", async(req, res) => {
    try {
        const { string } = req.body;

        const searchString = await pool.query(`
            SELECT * FROM users WHERE fname ILIKE '%${string}%';
        `)

        res.json(searchString.rows);
        console.log("get/searchString/:table");
    } catch (error) {
        console.log(error);
    }
});
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
router.get("/packs", async(req, res) => {
    try {
        const searchTables = await pool.query(
            `SELECT * FROM packs ORDER BY id`);

        res.json(searchTables.rows);
        console.log(`get/packs`);
    } catch (error) {
        console.log(error);
    }
});
router.get(`/signers/:pack`, async(req, res) => {
    try {
        const { pack } = req.params;

        const searchAllUsersWithThisPack = await pool.query(`
            SELECT users.id, users.fname, users.lname, users.signature_name, name, monthly_price FROM packs INNER JOIN users ON users.signature_name = name WHERE name = ($1) ORDER BY users.id;
        `, [ pack ]);

        res.json(searchAllUsersWithThisPack.rows);
        console.log('get/signers/:pack/');   
    } catch (error) {
        console.log(error);
    }
})
router.get('/profilepage/:id', async(req, res) =>{
    try {
        const {id} = req.params;        

        const searchCart = await pool.query(
            `SELECT users.id, fname, signature_name, signature_type, name, description, img_url, monthly_price FROM users INNER JOIN packs ON name = users.signature_name WHERE users.id = ($1);`,
            [ id ]);

        res.json(searchCart.rows);
        console.log(`get/profilepage/${id}`);
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
        console.log(`get/search/:table`);
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
        console.log(`get/search/:table/:id`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;