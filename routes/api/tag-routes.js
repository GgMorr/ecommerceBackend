const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint



router.get('/', (req, res) => {
  // find all tags
  Tag.findAll()
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Category and Tag data
});

// get one tag
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(Tag => {
      if (!Tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(Tag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new tag
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Tag.create(req.body)
    .then((tag) => {
      // if there's tag tags, we need to create pairings to bulk create in the Tag model
      if (req.body.tagIds.length) {
        const tagTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return tagTag.bulkCreate(tagTagIdArr);
      }
      // if no tags, just respond
      res.status(200).json(tag);
    })
    // .then((tagTagIds) => res.status(200).json(tagTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update tag
router.put('/:id', (req, res) => {
  // update tag data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated tags from Tag
      return tagTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((tagTags) => {
      // get list of current tag_ids
      const tagTagIds = tagTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newTagTags = req.body.tagIds
        .filter((tag_id) => !tagTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            tag_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const tagTagsToRemove = tagTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        TagTag.destroy({ where: { id: tagTagsToRemove } }),
        TagTag.bulkCreate(newtagTags),
      ]);
    })
    .then((updatedTagTags) => res.json(updatedTagTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
