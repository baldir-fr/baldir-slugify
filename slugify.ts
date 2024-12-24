export const slugify = (tokens:string[]) =>
  trimDashes(
    stripDoubleDashes(
      tokens
        .map(toLowerCase)
        .map(removeSpecialCharacters)
        .map(stripAccents)
        .map(replaceWhiteSpaces)
        .map(replaceSpecialQuotes)
        .map(removeEmojis)
        .join("-"),
    ),
  );

const toLowerCase = (word: string):string => word.toLowerCase();
const trimDashes = (word: string):string => word.replace(/^-/g, "").replace(/-$/g, "");
const stripDoubleDashes = (word: string):string =>
  word.replaceAll(/--/g, "-").replaceAll(/--/g, "-").replaceAll(/--/g, "-")
    .replaceAll(/--/g, "-").replaceAll(/--/g, "-").replaceAll(/--/g, "-")
    .replaceAll(/--/g, "-");
const replaceSpecialQuotes = (word: string):string =>
  word.replace(/[‘’“”“”‘’‛‟„]/g, "-");
const replaceWhiteSpaces = (word: string) :string=> word.replace(/\s/g, "-");
const removeEmojis = (word: string):string =>
  word.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    "",
  );

const removeSpecialCharacters = (word: string):string =>
  word.replace(/[!"#$%\&'()*\+,\.\/\:;<=>\?\[\]^`{|}~@]/g, "-");

const stripAccents = (word: string):string => {
  // Normalize unicode to separate base
  // characters from diacritical marks
  return word.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
};
