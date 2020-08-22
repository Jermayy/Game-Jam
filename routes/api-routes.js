// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const db = require("../models");
const Sequelize = require('sequelize');

// Routes
// =============================================================
module.exports = (app) => {

    // GET route for getting all of the games
    app.get("/api/games/", (req, res) => {
        db.Game.findAll({})
            .then((dbGame) => {
                res.json(dbGame);
            });
    });

    // Get route for returning games of a specific platform
    app.get("/api/games/platform/:platform", (req, res) => {
        db.Game.findAll({
                where: {
                    platform: req.params.platform
                }
            })
            .then((dbGame) => {
                res.json(dbGame);
            });
    });

    // Get route for retrieving a single game
    app.get("/api/games/:id", (req, res) => {
        // db.Game.findOne({
        //         where: {
        //             id: req.params.id
        //         }
        //     })
        //     .then((dbGame) => {
        //         res.json(dbGame);
        //     });

        db.sequelize.query("SELECT * FROM games WHERE id = ?", {
            replacements: [req.params.id],
            type: Sequelize.QueryTypes.SELECT
        }).then((dbGame) => {
            res.json(dbGame);
        })
    });

    // POST route for saving a new game
    app.post("/api/games", (req, res) => {
        console.log(req.body);
        db.Game.create({
                rank: req.body.rank,
                name: req.body.name,
                platform: req.body.platform,
                year: req.body.year,
                genre: req.body.genre,
                publisher: req.body.publisher,
                NA_Sales: req.body.NA_Sales,
                EU_Sales: req.body.EU_Sales,
                JP_Sales: req.body.JP_Sales,
                Other_Sales: req.body.Other_Sales,
                Global_Sales: req.body.Global_Sales,
            })
            .then((dbGame) => {
                res.json(dbGame);
            });
    });

    // DELETE route for deleting games
    app.delete("/api/games/:id", (req, res) => {
        db.Game.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((dbGame) => {
                res.json(dbGame);
            });
    });

    // PUT route for updating games
    app.put("/api/games", (req, res) => {
        db.Game.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then((dbGame) => {
                res.json(dbGame);
            });
    });
};