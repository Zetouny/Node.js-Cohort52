import newDatabase from "./database.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = true;
const database = newDatabase({ isPersistent });
const SECRET = "H6AIgu0wsGCH2mC6ypyRubiPoPSpV4t1";

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    res.json({ message: "Username and Password are required" });
    return;
  }

  const saltRounds = 12;
  const hashedPassword = await hash(password, saltRounds);
  const createdUser = database.create({
    username: username,
    password: hashedPassword,
  });

  res.status(200);
  res.json({ id: createdUser.id, username: createdUser.username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    res.json({ message: "Username and Password are required" });
    return;
  }

  const getUser = database.getByUsername(username);
  const usersPassword = getUser.password;
  const comparedPassword = await compare(password, usersPassword);

  if (!comparedPassword) {
    res.status(400);
    res.json({ message: "Password is incorrect" });
    return;
  }

  const usersID = getUser.id;
  const token = jsonwebtoken.sign(usersID, SECRET);

  res.status(201);
  res.json({ token: token });
};

export const profile = async (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    res.status(400);
    res.json({ message: "Token not found" });
    return;
  }
  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const verifiedUser = jsonwebtoken.verify(token.trim(), SECRET);
    if (!verifiedUser) {
      throw Error("Oops");
    }

    const userData = database.getById(verifiedUser);

    res.status(201);
    res.json({ message: `Welcome! ${userData.username}` });
  } catch (error) {
    res.status(400);
    res.json({ message: "Invalid token" });
    return;
  }
};

export const logout = async (req, res) => {
  res.status(204);
  res.json({ message: "Logged out successfully!" });
};
