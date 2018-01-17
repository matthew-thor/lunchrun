import gql from 'graphql-tag';

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
    }
  }
`;

export const todaysRunAdminQuery = gql`
query TodaysRunAdminQuery($today: String!) {
  allRoutes {
    id
    name
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
  }
}
`;
