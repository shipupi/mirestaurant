const {prisma} = require('../prisma/client');

exports.get_restaurants = async function() {
  const restaurants = await prisma.restaurants.findMany({
    include: {
      reviews: true
    }
  });
  return restaurants;
}

exports.create_restaurant = async function(name, slug) {
  const restaurant_creation = await prisma.restaurants.create({
    data: {
      name: name,
      slug: slug
    }
  });
  return restaurant_creation;
} 

exports.find_by_id = async function(id) {
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      restaurant_id: id
    },
    include: {
      reviews: {
        include: {
          users: true
        }
      }
    },
  }); 
  return restaurant;
}

exports.find_by_slug = async function(slug) {
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      slug: slug
    },
    include: {
      reviews: {
        include: {
          users: true
        }
      }
    },
  }); 
  return restaurant;
}

exports.find_by_name = async function(name) {
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      name: name
    }, 
  }); 
  return restaurant;
}

exports.delete_restaurant = async function(restaurant_id) {
  const restaurant_deletion = await prisma.restaurants.delete({where: {
    restaurant_id: restaurant_id
  }});
  return restaurant_deletion;
}