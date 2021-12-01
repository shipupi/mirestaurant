const {prisma} = require('../prisma/client');

exports.get_users = async function() {
  const users = await prisma.users.findMany();
  return users;
}

exports.create_user = async function(name, email, hashed_password) {
  try {
    const user_creation = await prisma.users.create({
      data: {
        email: email,
        password: hashed_password,
        name: name
      }
    });
    return user_creation;
  } catch (e) {
    throw e;
  }
}

exports.delete_user = async function(user_id) {
  const user_deletion = await prisma.users.delete({where: {
    id: user_id
  }});
  console.log(user_deletion);

}