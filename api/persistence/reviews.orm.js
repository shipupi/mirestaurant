const {prisma} = require('../prisma/client');

exports.get_reviews = async function() {
  const reviews = await prisma.reviews.findMany();
  return reviews;
}

exports.create_review = async function(restaurant_id, user_id, rating, comment) {
  const review_creation = await prisma.reviews.create({
    data: {
      user_id: user_id,
      restaurant_id: restaurant_id,
      rating: rating, 
      comment: comment
    }
  });
  return review_creation;
}

exports.find_by_id = async function(id) {
  const review = await prisma.reviews.findUnique({
    where: {
      review_id: id
    }, 
  }); 
  return review;
}

exports.delete_review = async function(review_id) {
  const review_deletion = await prisma.reviews.delete({where: {
    review_id: review_id
  }});
  return review_deletion;
}