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
) {
  updateEmailSchedule(
    groupId: $groupId,
    type: $type,
    time: $time,
  ) {
    id
  }
}
`;
