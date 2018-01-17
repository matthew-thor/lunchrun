import gql from 'graphql-tag';

export const updateParticipantMutation = gql`
mutation updateParticipant(
  $userId: Int!,
  $runId: Int!,
  $type: String!,
  $comment: String
) {
  updateParticipant(
    userId: $userId,
    runId: $runId,
    type: $type,
    comment: $comment
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
  $routeId: Int!
) {
  updateRun(
    runId: $runId,
    startTime: $startTime,
    routeId: $routeId
  ) {
    startTime
  }
}
`;
