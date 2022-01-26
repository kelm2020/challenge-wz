const express = require('express');
const fs = require('fs')
const services = require("./services");
const router = express.Router();

let alerts = {}

fs.readFile('./public/alerts.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        alerts = JSON.parse(data);
    }
})

router.get('/alerts', (req, res) => {
    const response = services.getAlerts({ data: alerts, ...req.query })
    return res.status(response.status).json(response.json)
})

router.get('/alerts/:id', (req, res) => {
    const response = services.getAlertsById({ data: alerts, id: req.params.id })
    return res.status(response.status).json(response.json)
})

router.get('/agents', (req, res) => {
    const response = services.getAgents({ data: alerts, ...req.query })
    return res.status(200).json(response)
})

router.get('/agents/:id', (req, res) => {
    const response = services.getAgentsById({ data: alerts, id: req.params.id })
    return res.status(response.status).json(response.json)
})
router.get('/rules', (req, res) => {
    const response = services.getRules({ data: alerts, id: req.params.id })
    return res.status(200).json(response)
})
router.get('/rules/:id', (req, res) => {
    const response = services.getRulesById({ data: alerts, id: req.params.id })
    return res.status(response.status).json(response.json)
})

module.exports = router;