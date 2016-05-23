import _ from 'lodash';

export default function hasPermissions(permissionsApiResult, expected) {
  // verify input.  we believe expected is reliable
  if (!permissionsApiResult || !permissionsApiResult.data) {
    return false;
  }

  const actual = permissionsApiResult.data
    .filter((permission) => permission.status === 'granted')
    .map((permission) => permission.permission);

  return _.difference(expected, actual).length <= 0;
}

