const hubs = require("../hubs/hubs-model.js")


const validateHubId = () => {
    return (req, res, next) => {
        hubs.findById(req.params.id)
        .then(hub => {
          if (hub) {
            // res.status(200).json(hub)
            // by moving on to next, we pass it to the route handler.

            //middleware is mutable. This means that we can pass along changes from one middleware to another.
            req.hub = hub
            next()
          } else {
            res.status(404).json({ message: "Hub not found" })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            message: "Error retrieving the hub",
          })
        })
    }
}

const validateHubData = () => {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({ message: "Missing hub name" })
          }
          next()
    }
}

module.exports = {
    validateHubId,
    validateHubData,
}