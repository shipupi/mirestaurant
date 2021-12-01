const review_service = require('../services/reviews.service');

exports.get_reviews = async function(req, res) {
    let reviews = await review_service.get_reviews();
    res.send(reviews);
};

exports.create_review = async function(req, res) {
    try {
        let user_id = 1; // TODO: get logged user id
        let restaurant_id = parseInt(req.body.restaurant_id);
        let review = await review_service.create_review(restaurant_id, user_id, req.body.rating, req.body.comment);
        res.status(201).json(review.review_id);
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to create review.");
    }
};

exports.delete_review = async function(req, res) {
    let review_id = parseInt(req.params.review_id);
    try {
        let review_deletion = await review_service.delete_review(review_id);
        if (review_deletion) {
            res.status(204).send();
        } else {
            res.status(404).send({
                message: `review with id ${review_id} does not exist`
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to delete review.");
    }
};

exports.edit_review = async function(req, res) {
    let review_id = parseInt(req.params.review_id);
    res.send('NOT IMPLEMENTED: edit review');
};