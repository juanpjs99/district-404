/**
 * Servicio de autenticación.
 * Maneja registro (crea Person + User + Profile) y login (valida credenciales + genera JWT).
 */
const PersonModel = require('../models/PersonModel');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const AuthService = {
  register: async (data) => {
    const { person, user } = data;

    const existingEmail = await PersonModel.findByEmail(person.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    const existingUser = await UserModel.findByUsername(user.UserName);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const personId = await PersonModel.create(person);
    const hashedPassword = await hashPassword(user.Password);
    const userId = await UserModel.create({
      personID: personId,
      UserName: user.UserName,
      Password: hashedPassword
    });

    await ProfileModel.create({ userID: userId });

    return { personId, userId };
  },

  login: async (UserName, Password) => {
    const user = await UserModel.findByUsername(UserName);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(Password, user.Password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const person = await PersonModel.findById(user.personID);
    const profile = await ProfileModel.findByUserId(user.ID);

    const token = generateToken({ userId: user.ID, personId: user.personID });

    return {
      token,
      user: {
        id: user.ID,
        username: user.UserName,
        person: {
          id: person.ID,
          firstName: person.firstName,
          firstSurname: person.firstSurname,
          email: person.email
        },
        profile
      }
    };
  },

  getMe: async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const person = await PersonModel.findById(user.personID);
    const profile = await ProfileModel.findByUserId(user.ID);

    return {
      id: user.ID,
      username: user.UserName,
      person,
      profile
    };
  }
};

module.exports = AuthService;
