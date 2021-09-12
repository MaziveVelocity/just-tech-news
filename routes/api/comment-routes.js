const router = require('express').Router();
const { Comment } = require('../../models');
const { Post, User, Vote } = require("../../models");

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text', 'user_id', 'post_id']
  }).then(dbData => {
    res.status(200).json(dbData);
  }).catch(err => {
    res.status(500).json({ message: 'failed to receive data', error: err })
  });
});

router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if(dbData[0] === 0){
      res.status(404).json({message: 'No item with that ID found'});
      return;
    }
    res.status(200).json({message: 'deletion success', data: dbData})
  }).catch(err => {
    res.status(500).json({message: 'failed to delete item', error: err})
  });
});

module.exports = router;