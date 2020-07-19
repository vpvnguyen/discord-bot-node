const formatNumber = (number) =>
  String(number).replace(/(.)(?=(\d{3})+$)/g, "$1,");

module.exports = formatNumber;
