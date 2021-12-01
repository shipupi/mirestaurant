const {prisma} = require('../prisma/client');

exports.get_restaurants = async function() {
  const restaurants = await prisma.restaurants.findMany();
  return restaurants;
}

exports.create_restaurant = async function(name) {
  const restaurant_creation = await prisma.restaurants.create({
    data: {
      name: name
    }
  });
  return restaurant_creation;
} 

exports.find_by_id = async function(id) {
  console.log("attempting to find restaurant: ", id);
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      restaurant_id: id
    }
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