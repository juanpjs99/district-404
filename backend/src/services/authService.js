/**
 * Servicio de autenticación.
 * Maneja login, carga de perfil y generación de JWT.
 */
const PersonModel = require('../models/PersonModel');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const RoleModel = require('../models/RoleModel');
const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { getUserRole } = require('../utils/userRole');

const AuthService = {
  register: async (data) => {
    const { firstName, firstSurname, email, username, password } = data;

    const existingEmail = await PersonModel.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const role = await RoleModel.findByName('blog_user');
    if (!role) {
      const error = new Error('Default role blog_user is not configured');
      error.statusCode = 500;
      throw error;
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const personId = await PersonModel.create({ firstName, firstSurname, email }, connection);
      const hashedPassword = await hashPassword(password);
      const userId = await UserModel.create({
        personID: personId,
        UserName: username,
        Password: hashedPassword,
        role_id: role.id
      }, connection);

      await ProfileModel.create({ userID: userId }, connection);
      await connection.commit();

      return { personId, userId, role: role.name };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  login: async (username, password) => {
    const user = await UserModel.findByUsername(username);
    if (!user || user.status !== 'active') {
      throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.Password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const person = await PersonModel.findById(user.personID);
    const profile = await ProfileModel.findByUserId(user.ID);
    const role = getUserRole(user);

    const token = generateToken({
      userId: user.ID,
      personId: user.personID,
      roleId: user.role_id,
      role
    });

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
    if (!user || user.status !== 'active') {
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
