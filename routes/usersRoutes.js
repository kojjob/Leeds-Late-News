const usersRouter = require('express').Router();

const { sendUser } = require('../controllers/usersControllers')
const { handle405s } = require('../errors/index')

usersRouter.route('/:username')
            .get(sendUser)
            .all(handle405s)

module.export = usersRouter;