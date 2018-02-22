import gql from 'graphql-tag';

export const updateParticipantMutation = gql`
mutation updateParticipant(
  $userId: Int!,
  $runId: Int!,
  $type: String!,
  $comment: String,
) {
  updateParticipant(
    userId: $userId,
    runId: $runId,
    type: $type,
    comment: $comment,
  ) {
    userId
    runId
    comment
  }
}
`;

export const updateRunMutation = gql`
mutation updateRun(
  $runId: Int!,
  $startTime: String!,
  $routeId: Int!,
) {
  updateRun(
    runId: $runId,
    startTime: $startTime,
    routeId: $routeId,
  ) {
    startTime
  }
}
`;

export const inviteUserMutation = gql`
mutation inviteUser(
  $email: String!,
  $groupId: Int!,
) {
  inviteUser(
    email: $email,
    groupId: $groupId,
  ) {
    groupId
  }
}
`;

export const updateEmailScheduleMutation = gql`
mutation updateEmailSchedule(
  $groupId: Int!,
  $type: String!,
  $time: String!,
  $days: String!,
) {
  updateEmailSchedule(
    groupId: $groupId,
    type: $type,
    time: $time,
    days: $days,
  ) {
    id
  }
}
`;

export const addRouteMutation = gql`
mutation addRoute(
  $name: String!,
  $map: String,
  $groupId: Int!,
) {
  addRoute(
    name: $name,
    map: $map,
    groupId: $groupId,
  ) {
    id
    name
    map
    groupId
  }
}
`;

export const changePasswordMutation = gql`
mutation changePassword(
  $userId: Int!,
  $currentPw: String!,
  $newPw: String!,
) {
  changePassword(
    userId: $userId,
    currentPw: $currentPw,
    newPw: $newPw,
  ) {
    id
  }
}
`;

export const resetPasswordMutation = gql`
mutation resetPassword(
  $userId: Int,
  $email: String,
) {
  resetPassword(
    userId: $userId,
    email: $email,
  ) {
    id
  }
}
`;

export const deleteUserMutation = gql`
mutation deleteUser(
  $userId: Int!,
) {
  deleteUser(
    userId: $userId,
  ) {
    id
  }
}
`;

export const deleteGroupMutation = gql`
mutation deleteGroup(
  $groupId: Int!,
) {
  deleteGroup(
    groupId: $groupId,
  ) {
    id
  }
}
`;
