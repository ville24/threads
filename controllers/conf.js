const confRouter = require('express').Router()
const Conf = require('../models/conf')

const confs = require('../confs.json')
const confsTest = require('../confs.test.json')


confRouter.get(
  '/',
  (request, response, next) => {

    const query = {}

    request.query.type
      ? query.type = request.query.type
      : null

    const conf = new Conf({})
    conf.newsSources = [
      {
        _id: '67580eb6a8c0c483597dbf07',
        type: query.type
      }
    ]

    const error = conf.validateSync()

    if (error) {

      next(error)

    } else {

      const confFile = process.env.NODE_ENV === 'production'
        ? new Conf(confs)
        : (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && new Conf(confsTest)

      const error = confFile.validateSync()

      if (error) {

        next(error)

      } else {

        confFile.newsSources.sort((a, b) => a.order - b.order)

        response.json(confFile)

      }

    }

  }
)

module.exports = confRouter
