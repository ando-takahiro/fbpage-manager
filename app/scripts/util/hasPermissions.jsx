import _ from 'lodash';

// returns true if response of /me/permissions has all expected permissions
export default function hasPermissions(permissionsApiResult, expected) {
  // This function does not require performance, so let me use exception
  try {
    const actual = permissionsApiResult.data
      .filter((permission) => permission.status === 'granted')
      .map((permission) => permission.permission);

    return _.difference(expected, actual).length <= 0;
  } catch (_e) {
    return false;
  }
}

