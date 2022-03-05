const express = require('express')
const router = express.Router()
const Subscriber = require('../models/susbcriber')
const dbConnect = require('../utils/dbConnect')

dbConnect()

//geting all subscribers
router.get('/', async (req,res)=>{
    try{
        const subscribers = Subscriber.find()
    }catch(err){
        res.status(500).json({message : error.message})
    }
})

//geting one subscriber
router.get('/:id', getSubscriber, (req,res)=>{
   res.json(res.subscriber)
})

//creating a subscriber
router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch{
        res.status(400).json({message: error.message})
    }
})

//updating a Subscriber
router.patch('/:id', getSubscriber, async(req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber).status(201)
    }catch(err){
        res.status(400).json({message: error.message})
    }
})

//deleting a subscriber
router.post('/:id',getSubscriber, async (req,res)=>{
    try{
        await res.subscriber.remove()
        res.json({message: 'deleted subscriber'})
    }catch(err){
        res.status(500).json({message: error.message})
    }
})

async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message: error.message})
    }

    res.subscriber = subscriber

}


module.exports = router