const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION
const pool = require('../pool');

// GET
koalaRouter.get( '/', ( req, res )=>{
    console.log(' in koala.router GET' );
    let queryString = `SELECT * FROM "koala_holla";`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
}) // end router.get

// POST
koalaRouter.post( '/', ( req, res )=>{
    console.log( ' in koala.router POST', req.body );
    let queryString = `INSERT INTO "koala_holla" (name, gender, age, ready_to_transfer, notes ) VALUES ($1, $2, $3, $4, $5)`;
    //ask pool to run query
    pool.query( queryString, [ req.body.name, req.body.gender, req.body.age, req.body.ready_to_transfer, req.body.notes ])
    .then( ( results )=>{
        //send status if successful
        res.sendStatus( 200 );
    }).catch( (err) =>{
        console.log( err );
        res.sendStatus( 500 );
    });
});

// PUT
koalaRouter.put( '/:id' , ( req, res ) => {
    console.log( 'koala.router PUT: ' , req.params );
    let queryString = `UPDATE "koala_holla" SET "ready_to_transfer" = true WHERE "id" =$1;`;  
    pool.query( queryString, [req.params.id]).then(( results )=>{
        res.sendStatus( 200 );
    }).catch((err) =>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

// DELETE
koalaRouter.delete( '/:id', (req, res)=>{
    console.log( 'koala.router DELETE:', req.params );
    let queryString = `DELETE FROM "koala_holla" WHERE "id"=$1;`;
    pool.query( queryString, [ req.params.id ] ).then( (results )=>{
        res.sendStatus ( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = koalaRouter;