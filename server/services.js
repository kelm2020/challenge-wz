const getAlerts = ({ data, offset = 0, limit = 10, id }) => {
    const arrOffset = Number(offset)
    const arrLimit = Number(limit)
        // id = ['23Gmr3QB4YtWQbLv1inX', '4HGmr3QB4YtWQbLv1inX', '53Gmr3QB4YtWQbLv1inX']
    if (id) {
        let alertsByIds = []
        id.forEach((element) => {
            data.forEach((el) => {
                if ((element) == (el._id)) {
                    alertsByIds.push(el)
                }
            })
        })
        if (alertsByIds.length === 0) {
            return {
                status: 404,
                json: {
                    message: `Alert/s with ID/s was not found`,
                    status: "fail"
                }
            }
        }
        return {
            status: 200,
            json: {
                total_items: alertsByIds.length,
                data: alertsByIds
            }
        }
    }
    const end = data.length > (arrOffset + arrLimit) ? (arrOffset + arrLimit) : undefined
    let slicedArray = data.slice(arrOffset, end)
    return {
        status: 200,
        json: {
            total_items: data.length,
            data: slicedArray
        }
    }
};

const getAlertsById = ({ data, id }) => {
    const alertsById = data.filter((element) => {
        if (element._id === id) {
            return element
        }
    })
    
                return {
                    status: 200,
                    json: {
            total_items: 1,
            data: alertsById
        }
    }
}

const getAgents = ({ data, offset = 0, limit = 10 }) => {
    const arrOffset = Number(offset)
    const arrLimit = Number(limit)
    let filteredArray = [...data]
    let agentsList = []
    filteredArray.forEach((element) => {
        if (agentsList.length > 0) {
            const agentIndex = agentsList.findIndex(item => item.id === element._source.agent.id);
            if (agentIndex === -1) {
                return agentsList.push(element._source.agent)
            }
        } else {
            return agentsList.push(element._source.agent)
        }
    })

    const agentsWithAlerts = agentsList.map((element) => {
        let total_alerts = 0
        filteredArray.forEach((el) => {
            if (el._source.agent.id === element.id) {
                total_alerts = total_alerts + 1
            }
        })
        return {...element, total_alerts }
    })

    const end = agentsWithAlerts.length > (arrOffset + arrLimit) ? (arrOffset + arrLimit) : undefined
    let slicedArray = agentsWithAlerts.slice(arrOffset, end)
    return {
        status: 200,
        json: {
            total_items: agentsWithAlerts.length,
            data: slicedArray
        }

    }
}

const getAgentsById = ({ data, id }) => {
    const alertsByIdAgent = data.filter((element) => {
        if (element._source.agent.id === id) {
            return element
        }
    })

    if (alertsByIdAgent.length === 0) {
        return {
            status: 404,
            json: {
                message: `Agent with ID ${id} was not found`,
                status: "fail"
            }
        }
    }
    return {
        status: 200,
        json: {
            data: {
                id: id,
                name: alertsByIdAgent[0]._source.agent.name,
                ip: alertsByIdAgent[0]._source.agent.ip,
                total_alerts: alertsByIdAgent.length,
                alerts: alertsByIdAgent
            }
        }
    }
}

const getRules = ({ data, offset = 0, limit = 10 }) => {
    const arrOffset = Number(offset)
    const arrLimit = Number(limit)
    let filteredArray = [...data]
    let rulesList = []
    filteredArray.forEach((element) => {
        if (rulesList.length > 0) {
            const ruleIndex = rulesList.findIndex(item => item.id === element._source.rule.id);
            if (ruleIndex === -1) {
                return rulesList.push(element._source.rule)
            }
        } else {
            return rulesList.push(element._source.rule)
        }
    })

    const alertsByRule = rulesList.map((element) => {
        let total_alerts = 0
        filteredArray.forEach((el) => {
            if (el._source.rule.id === element.id) {
                total_alerts = total_alerts + 1
            }
        })
        return {...element, total_alerts }
    })

    const end = alertsByRule.length > (arrOffset + arrLimit) ? (arrOffset + arrLimit) : undefined
    let slicedArray = alertsByRule.slice(arrOffset, end)
    return {
        total_items: alertsByRule.length,
        data: slicedArray

    }
}
const getRulesById = ({ data, id }) => {
    const alertsByRule = data.filter((element) => {
        if (element._source.rule.id === id) {
            return element
        }
    })

    if (alertsByRule.length === 0) {
        return {
            status: 404,
            json: {
                message: `Rule with ID ${id} was not found`,
                status: "fail"
            }
        }
    }
    return {
        status: 200,
        json: {
            ...alertsByRule[0]._source.rule,
            total_alerts: alertsByRule.length,
            alerts: alertsByRule
        }
    }
}


module.exports = {
    getAlerts,
    getAlertsById,
    getAgents,
    getAgentsById,
    getRules,
    getRulesById
}