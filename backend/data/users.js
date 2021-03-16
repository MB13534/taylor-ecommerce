import bcrypt from "bcryptjs";

const users = [
  {
    name: "Michael Barry",
    email: "michael.barry.email@gmail.com",
    //since this is just a seeder, and not a form, we can just use the sync method instead of async
    //first argument is pw, second is salt times
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Taylor Carey",
    email: "taylorj.carey@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
