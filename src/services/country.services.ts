export const countryArrayToString = (countries: string[]): string =>
  countries.reduce((acc, country, index) => {
    if (index === countries.length - 1) {
      return `${acc}${country}`;
    }
    return `${acc}${country}, `;
  }, '');

export const countryStringToArray = (countries: string): string[] =>
  countries
    .split(',')
    .map((country) => country.trim())
    .filter((country) => country !== '');
