// const metadata = require('gcp-metadata')

// const {OAuth2Client} = require('google-auth-library')

// const logger = require('./logger')

// const config = require('./config')

const requestLogger = (request, response, next) => {

  /*
   *logger.info('Method:' + request.method)
   *logger.info('Path:' + request.path)
   *logger.info('Body:' + JSON.stringify(request.body))
   *logger.info('---')
   */
  console.log('Method:' + request.method)
  console.log('Path:' + request.path)
  console.log('Body:' + JSON.stringify(request.body))
  console.log('---')

  next()

}

const unknownEndpoint = (request, response) => {

  response.status(404).send({error: 'unknown endpoint'})

}

const errorHandler = (error, request, response) => {

  /*
   *logger.error(error.name)
   *logger.error(error.message)
   */
  console.error(
    'error name',
    error.name
  )
  console.error(
    'error message',
    error.message
  )
  console.log('test')

  if (error.name === 'CastError') {

    return response.status(400).json({error: error.message})

  } else if (error.name === 'ValidationError') {

    return response.status(400).json({error: error.message})

  } else if (error.name === 'SyntaxError') {

    return response.status(400).json({error: error.message})

  } else if (error.name === 'JsonWebTokenError') {

    return response.status(401).json({error: 'token missing or invalid'})

  } else if (error.name === 'TokenExpiredError') {

    return response.status(401).json({error: 'token expired'})

  } else if (error.name === 'Unauthorized') {

    return response.status(401).json({error: 'No access rights'})

  } else if (error.name === 'AxiosError' || error.name === 'File not found') {

    return response.status(404).json({error: 'News source not available'})

  } else if (error.name === 'Error' && error.message === 'Login Required.') {

    return response.status(401).json({error: 'Login required'})

  } else {

    return response.status(400).json({
      error: 'General error',
      name: error.name,
      message: error.message
    })

  }

}

/*
 *  const oAuth2Client = new OAuth2Client()
 *
 *  let aud
 *
 *  const audience = async () => {
 *
 *    if (!aud && await metadata.isAvailable()) {
 *
 *      const project_number = await metadata.project('numeric-project-id')
 *      const project_id = await metadata.project('project-id')
 *
 *      aud = '/projects/' + project_number + '/apps/' + project_id
 *
 *    }
 *
 *    return aud
 *
 *  }
 *
 *  const validateAssertion = async (assertion) => {
 *
 *    if (!assertion) {
 *
 *      return {}
 *
 *    }
 *
 *    const aud = await audience()
 *
 *    const response = await oAuth2Client.getIapPublicKeys()
 *    const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
 *      assertion,
 *      response.pubkeys,
 *      aud,
 *      ['https://cloud.google.com/iap']
 *    )
 *    const payload = ticket.getPayload()
 *
 *    return {
 *      email: payload.email,
 *      sub: payload.sub
 *    }
 *
 *  }
 *
 *  const auth = async (request, response, next) => {
 *
 *   const assertion = request.header('X-Goog-IAP-JWT-Assertion')
 *    try {
 *
 *      const info = await validateAssertion(assertion)
 *      if (info.email !== config.USERNAME) {
 *
 *        return response.status(401).json({error: 'No access rights'})
 *
 *      }
 *
 *    } catch (error) {
 *
 *      return response.status(401).json({error})
 *
 *    }
 *    next()
 *
 *  }
 */

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler// ,
  // auth
}
