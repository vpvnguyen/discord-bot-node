const sort = {
  recentMessageByDate: (array) => array.sort((a, b) => b.date - a.date),
};

module.exports = sort;
