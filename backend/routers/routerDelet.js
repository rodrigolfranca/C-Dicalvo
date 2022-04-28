const EXPRESS = require("express");
const { jwtCheck } = require("../checkJWT");
const router = EXPRESS.Router();
// postgreSQL;
const pool = require("../db");

// DELETE item nas tabelas, pelo id
router.delete("/delete/:table/:id", jwtCheck, async(req, res) => {
    try {
        const {table} = req.params;
        const {id} = req.params;

        const deleteIteminTheTables  = await pool.query(`
            DELETE FROM ${table} WHERE id = ($1)`,
            [ id ]);

        res.json(`Item ${id} from ${table} was deleted`)
        console.log("delete/delete/:table/:id");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;