const express = require("express");
const router = express.Router();
const  Theater = require("../controllers/theater_controller")

// theaters: view all theaters
router.get("/",Theater.viewAll);
// theaters: get detais of a specific theater
router.get("/:id",Theater.viewOne);
// theaters: add new theater
router.post("/",Theater.addTheater);
// theaters: update detais of a specific theater
router.put("/:id",Theater.updateTheater );
// theaters: delete theater
router.delete("/:id",Theater.deleteTheater );


module.exports = router;
