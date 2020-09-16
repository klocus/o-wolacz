export const environment = {
  production: false,
  maxFields: 5,
  postRegex: 'https*:\/\/www.wykop.pl\/wpis\/([0-9]+)\/(?:#comment\-([0-9]+)|(.*))?',
  userRegex: 'ludzie\/([^\/]+)',
  endpoint: 'https://www.wykop.pl/ajax2/wpis',
  perChunk: {
    green: 20,
    orange: 50,
    maroon: 100
  }
};