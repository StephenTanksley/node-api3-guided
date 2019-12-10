module.exports = (type) => (req, res, next) => {

    if(type === 'long') {
        console.log(`long request: ${req.ip} -- ${req.protocol} -- ${req.method} -- ${req.url} -- ${req.get("User-Agent")} `)
        next()
    } else if (type === 'short') {
        console.log(`short request: ${req.ip} -- ${req.protocol} -- ${req.url} -- ${req.get("User-Agent")} `)
        next()
    } else {
        console.log(req)
    }
        
}