const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one product 
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    // if (req.body.catIds.length) {
    //   const catTagIdArr = req.body.tagIds.map((category_id) => {
    //     return {
    //       category_id: category.id,
    //       category_id,
    //     };
    //   });
    //   return CategoryTag.bulkCreate(catTagIdArr);
    // }
    res.status(200).json(category);
  })
  // .then((catTagIds) => res.status(200).json(catTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return CategoryTag.findAll({ where: { category_id: req.params.id } });
    })
    .then((categoryTags) => {
      const categoryTagIds = categoryTags.map(({ category_id}) => category_id)
      .filter((category_id) => !categoryTagIds.include(category_id))
      .map((category_id) => {
        return {
          category_id: req.params.id,
          category_id,
        };
      });
      const categoryTagsToRemove = categoryTags
      .filter(({ tag_id }) => !req.body.catIds.include(tag_id))
      .map(({ id }) => id);
      // run both actions
      return Promise.all([
        CategoryTag.destroy({ where: { id: categoryTagsToRemove } }),
        CategoryTag.bulkCreate(newCategoryTags),
      ]);
    })
    .then((updatedCategoryTags) => res.json(updatedCategoryTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(category => { 
    if (!category) {
    res.status(404).json({ message: 'No category found with this id' });
    return;
  }
  res.json(category);
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;
