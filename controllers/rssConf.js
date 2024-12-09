const Conf = require('../models/conf')

const confs = require('../confs.json')
const confsTest = require('../confs.test.json')

const rssConf = (id, next) => {

  const conf = new Conf({
    _id: id,
    type: 'newsSource'
  })
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

      return confFile.newsSources.filter((o) => o.id === id)[0]

    }

  }

}

module.exports = rssConf
