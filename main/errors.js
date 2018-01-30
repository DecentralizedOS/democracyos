const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND
} = require('http-status')

class APIError extends Error {
  constructor (
    message,
    {
      status = INTERNAL_SERVER_ERROR,
      translationKey = null
    },
    metadata = {}
  ) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.status = status
    this.translationKey = translationKey
    this.metadata = metadata
  }
}

const ErrNotFound = new APIError('not found', {
  translationKey: 'NOT_FOUND',
  status: NOT_FOUND
})

const ErrInvalidParams = new APIError('Invalid paramethers', {
  translation_key: 'INVALID_PARAMS',
  status: 400
})

const ErrParamsTooLong = new APIError('Paramethers are too long', {
  translation_key: 'PARAMS_LENGTH',
  status: 400
})

module.exports = {
  APIError,
  ErrNotFound,
  ErrInvalidParams,
  ErrParamsTooLong
}
