const EXPRESS = require("express");
const { jwtCheck } = require("../checkJWT");
const router = EXPRESS.Router();
const { comparePwd, hashPwd } = require('../hashPwd');
// postgreSQL;
const pool = require("../db");

router.put(`/altertabag/:id`, async(req,res) => {
    try{
        const { id } = req.params;
        const {id_pack} = req.body;
        const {signature_type} = req.body;
        const {id_user} = req.body;
    
        const alterBagByUserId =  await pool.query(`
            UPDATE bags SET id_pack = ($1), signature_type = ($2), id_user = ($3)  WHERE id_user = ($4);`, 
            [ id_pack, signature_type, id_user, id]);

        
            res.json(`ID = ${id_user} in bags was Updated!`);
            console.log(`put/altertabag/${id}`);
    }catch(err){
        console.log(err);
    }
})
// update item nas tabelas pelo ID;
router.put("/update/:table/:id", jwtCheck, async(req, res)=> {
    try {
        const { table } = req.params;
        const { id } = req.params;

        if ( table == "users" ){
            const {fname} = req.body;
            const {lname} = req.body;
            const {email} = req.body;
            const {type_of_bold} = req.body;

    
            const updateTables = await pool.query(`
                UPDATE users SET fname = $1, lname = $2, email = $3, type_of_bold = $4 WHERE id = $5;`
                , [ fname, lname, email, type_of_bold, id ]);
        } else if ( table == "packs" ){
            const {name}  = req.body;
            const {description}  = req.body;
            const {img_url}  = req.body;
            const {monthly_price}  = req.body;

            const updateTables = await pool.query(`
                UPDATE packs SET name = ($1), description = ($2), img_url  = ($3), monthly_price = ($4) WHERE id = ($5);`,
                [ name, description, img_url, monthly_price, id]);
        } else if ( table == "bag" ){
            const {id_pack} = req.body;
            const {signature_type} = req.body;
            const {id_user} = req.body;

            const updateTables = await pool.query(`
                UPDATE bag SET id_pack = ($1), signature_type = ($2), id_user = ($3)  WHERE id = ($4);`, 
                [ id_pack, signature_type, id_user, id]);
        }

        res.json(`ID = ${id} in ${table} was Updated!`);
        console.log("put/update/:table/:id");
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
        console.log("put/updateonly/users/:id");
    } catch (error) {
        console.log(error);
    }
});
router.put("/updatesenha/users/:id", jwtCheck, async(req, res)=> {
    try {
        const { id } = req.params;
        let { password } = req.body;
        password = hashPwd(password)

        const updateTables = await pool.query(`
                UPDATE users SET  password = ($1) WHERE id = ($2);`,
            [ password, id]);
        res.json(`ID = ${id} in users was Updated!`);
    } catch (error) {
        console.log(error);
    }
});
router.put("/testeSenha/:id", jwtCheck, async(req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const searchTables = await pool.query(
            `SELECT * FROM users WHERE id = ($1)`, 
            [id]);
            
        if ( comparePwd(password, searchTables.rows[0].password) ) {
            res.json("true");
        } else{
            res.json("false")
        }
        console.log(`put/testeSenha/${id}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;