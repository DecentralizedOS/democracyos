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

const ErrMissingParam = new APIError('Missing required paramether', {
  translation_key: 'MISSING_PARAM',
  status: 400
})

const ErrParamTooLong = new APIError('Paramether is too long', {
  translation_key: 'PARAM_LENGTH',
  status: 400
})

module.exports = {
  APIError,
  ErrNotFound,
  ErrMissingParam,
  ErrParamTooLong
}
