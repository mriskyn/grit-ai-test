const { Library } = require('../models')

exports.getAll = async(req, res) => {
  try {
    const libraries = await Library.findAll()

    res.json(libraries)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getById = async(req, res) => {
  const { id } = req.params
  try {
    const library = await Library.findByPk(id)

    if (!library) {
      return res.status(404).json({
        message: 'Library not found'
      })
    }

    return res.json(library)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.create = async(req, res) => {
  const body = req.body
  try {
    const library = await Library.create(body)

    res.status(201).json(library)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.update = async(req, res) => {
  const body = req.body
  const { id } = req.params
  try {
    await Library.update(body, { where: { id } })

    res.json({
      message: `Library with id=${id} successfully updated`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.remove = async(req, res) => {
  const { id } = req.params

  try {
    await Library.destroy({ where: { id}})

    res.json({
      message: `Library with id=${id} successfully deleted`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}