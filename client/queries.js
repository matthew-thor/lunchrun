import gql from 'graphql-tag';

export const userHomeQuery = gql`
  query UserHomeQuery($groupId: Int!) {
    group(id: $groupId) {
      admins {
        id
      }
    }
  }
`;

export const accountQuery = gql`
  query AccountQuery($groupId: Int!) {
    group(id: $groupId) {
      id
      admins {
        id
      }
    }
  }
`;

export const groupAdminQuery = gql`
  query GroupAdminQuery($groupId: Int!) {
    group(id: $groupId) {
      id
      admins {
        id
      }
      emails {
        id
        type
        time
        days
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
  query TodaysRunQuery($today: String!, $groupId: Int!) {
    run(date: $today, groupId: $groupId) {
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
    members {
      id
      fullName
      email
    }
  }
  run(date: $today, groupId: $groupId) {
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

export const groupEmailsQuery = gql`
query GroupEmailsQuery($groupId: Int!) {
  group(id: $groupId) {
    emails {
      id
      type
      time
    }
  }
}
`;

export const routesQuery = gql`
query RoutesQuery($groupId: Int!) {
  group(id: $groupId) {
    admins {
      id
    }
  }
}
`;

export const siteAdminQuery = gql`
query SiteAdminQuery {
  allGroups {
    id
    name
    admins {
      id
    }
    routes {
      id
      name
    }
    emails {
      id
    }
  }
  allUsers {
    id
    fullName
    email
    admin
    groups {
      id
      name
    }
  }
}
`;
