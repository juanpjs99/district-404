const ADMIN_ROLE = 'admin';
const DEFAULT_ROLE = 'viewer';

const configuredAdminIds = () => {
  return (process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
};

const getUserRole = (user) => {
  if (user?.role === ADMIN_ROLE) {
    return ADMIN_ROLE;
  }

  if (user?.ID && configuredAdminIds().includes(String(user.ID))) {
    return ADMIN_ROLE;
  }

  return DEFAULT_ROLE;
};

module.exports = {
  ADMIN_ROLE,
  DEFAULT_ROLE,
  getUserRole
};
