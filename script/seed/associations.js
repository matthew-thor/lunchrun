const setAssociations = (groups, users, routes, runs, emails) => {
  return Promise.all([
    groups[0].addMembers([1, 2, 3]),
    groups[1].addMembers([1]),
    groups[0].addAdmins([1, 2]),
    groups[0].addRoutes([1, 2]),
    groups[1].addRoutes([3]),
    runs[0].setRoute(1),
    runs[1].setRoute(2),
    runs[0].addParticipants([1, 2]),
    runs[0].addAdmins([3]),
    emails[0].setGroup(1),
    emails[1].setGroup(1),
  ]);
};

module.exports = setAssociations;
