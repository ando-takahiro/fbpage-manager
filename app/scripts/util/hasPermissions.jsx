import _ from 'lodash';

export default function hasPermissions(permissionsApiResult, expected) {
  const actual = permissionsApiResult.data
    .filter((permission) => permission.status === 'granted')
    .map((permission) => permission.permission);

  return _.difference(expected, actual).length <= 0;
}

