
function TrackingError (options = {}) {
    this.name = 'TrackingError'
    this.message = options.message
    this.type = options.type
    this.errors = options.errors
}

TrackingError.prototype = Object.create(Error.prototype)
TrackingError.prototype.constructor = TrackingError

module.exports = TrackingError