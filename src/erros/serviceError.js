class ServiceError extends Error {
  constructor({ message, service } = {}) {
    super();

    this.name = "ServiceError";
    this.message = message;
    this.service = service;
  }
}

module.exports.ServiceError = ServiceError;
