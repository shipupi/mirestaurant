const {prisma} = require('../prisma/client');

const user_select = {
  user_id: true,
  name: true,
  email: true
};

exports.get_users = async function() {
  const users = await prisma.users.findMany({
    select: user_select,
    orderBy: {
      user_id: "asc"
    }
  });
  return users;
}

exports.create_user = async function(name, email, hashed_password) {
  const user_creation = await prisma.users.create({
    data: {
      email: email,
      password: hashed_password,
      name: name
    }
  });
  return user_creation;
}

exports.find_by_email = async function(email) {
  const user = await prisma.users.findUnique({
    where: {
      email: email
    }, 
  }); 
  return user;
}

exports.find_by_id = async function(id) {
  const user = await prisma.users.findUnique({
    where: {
      user_id: id
    }
  }); 
  return user;
}

exports.patch_user = async function(id, name, email, hashed_password, is_admin) {
  let data = {}
  if (name) data.name = name;
  if (email) data.email = email;
  if (hashed_password) data.password = hashed_password;
  if (is_admin != null) data.is_admin = is_admin;
  const user = await prisma.users.update({
    select: user_select,
    where: {
      user_id: id
    },
    data: data
  });
  return user;
}

exports.delete_user = async function(user_id) {
  const user_deletion = await prisma.users.delete({where: {
    user_id: user_id
  }});
  return user_deletion;

}