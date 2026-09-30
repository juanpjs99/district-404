/**
 * Servicio de autenticación.
 * Maneja login, carga de perfil y generación de JWT.
 */
const PersonModel = require('../models/PersonModel');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { getUserRole } = require('../utils/userRole');

const AuthService = {
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
    const role = getUserRole(user);

    const token = generateToken({ userId: user.ID, personId: user.personID, role });

    return {
      token,
      user: {
        id: user.ID,
        username: user.UserName,
        role,
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
    const role = getUserRole(user);

    return {
      id: user.ID,
      username: user.UserName,
      role,
      person,
      profile
    };
  }
};

module.exports = AuthService;
