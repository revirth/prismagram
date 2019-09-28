export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`
  }
};
