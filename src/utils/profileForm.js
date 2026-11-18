export function getProfileFormValues(user) {
  const nameParts = typeof user?.name === 'string'
    ? user.name.trim().split(/\s+/).filter(Boolean)
    : [];
  const firstName = nameParts.shift() ?? '';
  const lastName = typeof user?.lastName === 'string' && user.lastName.trim()
    ? user.lastName.trim()
    : nameParts.join(' ');

  return {
    firstName,
    lastName,
    email: typeof user?.email === 'string' ? user.email : '',
  };
}
