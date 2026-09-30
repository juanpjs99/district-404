const ADMIN_ROLE = 'superadmin';
const DEFAULT_ROLE = 'blog_user';

const configuredAdminIds = () => {
  return (process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
};

const getUserRole = (user) => {
  const role = user?.role_name || user?.role;

  if (user?.ID && configuredAdminIds().includes(String(user.ID))) {
    return ADMIN_ROLE;
  }

  if (role === 'admin' || role === ADMIN_ROLE) {
    return ADMIN_ROLE;
  }

  if (['member', 'blog_user'].includes(role)) {
    return role;
  }

  return DEFAULT_ROLE;
};

module.exports = {
  ADMIN_ROLE,
  DEFAULT_ROLE,
  getUserRole
};
