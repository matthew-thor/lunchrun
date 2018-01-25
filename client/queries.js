import gql from 'graphql-tag';

export const userHomeQuery = gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      admins {
        id
      }
    }
  }
`;

export const accountQuery = gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      admins {
        id
      }
    }
  }
`;

export const participantsQuery = gql`
  query ParticipantsQuery($today: String!) {
    run(date: $today) {
      id
      participants {
        userId
        comment
        user {
          email
          fullName
        }
      }
      admins {
        id
        fullName
      }
    }
  }
`;

export const todaysRunQuery = gql`
  query TodaysRunQuery($today: String!) {
    run(date: $today) {
      id
      date
      startTime
      route {
        name
      }
      participants {
        userId
        comment
        user {
          email
          fullName
        }
      }
      admins {
        id
      }
    }
  }
`;

export const todaysRunAdminQuery = gql`
query TodaysRunAdminQuery(
  $today: String!,
  $groupId: Int!,
) {
  group(id: $groupId) {
    id
    name
    routes {
      id
      name
    }
    emails {
      id
      type
      time
    }
  }
  run(date: $today) {
    id
    date
    startTime
    route {
      id
      name
    }
    participants {
      userId
      comment
      user {
        email
        fullName
      }
    }
    admins {
      id
    }
  }
}
`;
