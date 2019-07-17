module.exports = queryParams => {
  let result = {
    count: 0,
    searchFirstName: new RegExp(/a^/),
    searchLastName: new RegExp(/a^/),
    searchNickName: new RegExp(/a^/)
  };
  const { firstName, lastName, nickName } = queryParams;
  if (!!firstName) {
    result.searchFirstName = new RegExp(firstName);
    result.count += 1;
  }
  if (!!lastName) {
    result.searchLastName = new RegExp(lastName);
    result.count += 1;
  }
  if (!!nickName) {
    result.searchNickName = new RegExp(nickName);
    result.count += 1;
  }
  return result;
};
