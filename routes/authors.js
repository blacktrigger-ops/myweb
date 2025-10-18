const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors route
router.get('/', async(req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i'); // 'i' for case insensitive
    }
    try{
    const authors = await Author.find(searchOptions);

    res.render('authors/index', { 
        authors: authors,
     searchOptions: req.query});
    }catch{
        res.redirect('/');
        
    }
    
});


// New author route
router.get('/new', (req, res) => {
    res.render('authors/new',{author:new Author()});
});

// Create author route
router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name // Assuming 'name' is coming from your form
    });

    try {
        // Await the promise returned by author.save()
        const newAuthor = await author.save();

        // If save is successful:
        // You might want to redirect to the newly created author's detail page,
        // or a page showing all authors.
        // res.redirect(`/authors/${newAuthor.id}`);
        res.redirect(`/authors`); 

    } catch (err) {
        // If an error occurs during save (e.g., validation error)
        console.error(err); // Log the full error for debugging

        // Render the new author form again, pre-filling with the attempted data
        // and showing an error message to the user.
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
});

module.exports = router;