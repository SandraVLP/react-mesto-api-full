const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
// const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(new Error());
      }
    });
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(new Error());
      }
    });
};

module.exports.deleteCard = async (req, res, next) => {
  const cardToDelete = await Card.findOne({ _id: req.params.cardId });
  const currentUserId = req.user._id;
  if (cardToDelete == null) {
    next(new NotFoundError('Передан несуществующий _id карточки.'));
  } else if (currentUserId === cardToDelete.owner.toString()) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => next(new NotFoundError('Карточка с указанным _id не найдена.')));
  } else {
    next(new ForbiddenError('Нельзя удалять чужие карточки.'));
  }
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError('Передан несуществующий _id карточки.'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Переданы некорректные данные для постановки/снятии лайка.'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};
