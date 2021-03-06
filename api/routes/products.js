const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/',(req,res,next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});


router.post('/',(req,res,next) => {
    
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Handling POST request',
            productOrdered : product,
            createdProduct : result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });  
   

});

router.get('/:productId',(req,res,next) => {
 
    const id =req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message : 'NO valid entry found'});
            }
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;