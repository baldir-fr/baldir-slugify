import { describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { slugify } from "./slugify.ts";

describe("slugify", () => {
  test("with empty parameter", () => expect(slugify([])).toBe(""));
  test("foo -> foo", () => expect(slugify(["foo"])).toBe("foo"));
  test("foo bar -> foo-bar", () =>
    expect(slugify(["foo", "bar"])).toBe("foo-bar"));
  test("Foo -> foo", () => expect(slugify(["Foo"])).toBe("foo"));
  test("dash-dash -> dash-dash", () =>
    expect(slugify(["dash-dash"])).toBe("dash-dash"));
  test("dash--dash -> dash-dash", () =>
    expect(slugify(["dash--dash"])).toBe("dash-dash"));
  test("dash-------------dash -> dash-dash", () =>
    expect(slugify(["dash-------------dash"])).toBe("dash-dash"));
  test("-trimdash- -> trimdash", () =>
    expect(slugify(["-trimdash-"])).toBe("trimdash"));
  test("lowdash_lowdash -> lowdash_lowdash", () =>
    expect(slugify(["lowdash_lowdash"])).toBe("lowdash_lowdash"));

  describe("stripping accents", () => {
    test("Föo -> foo", () => expect(slugify(["Föo"])).toBe("foo"));
    test("Féo -> feo", () => expect(slugify(["Féo"])).toBe("feo"));
    test("Féö -> feo", () => expect(slugify(["Feö"])).toBe("feo"));
  });

  describe("remove special characters", () => {
    test("exclamation! -> exclamation", () =>
      expect(slugify(["exclamation!"])).toBe("exclamation"));
    test("question? -> question", () =>
      expect(slugify(["question?"])).toBe("question"));
    test(`"doublequoted" -> doublequoted`, () =>
      expect(slugify([`"doublequoted"`])).toBe("doublequoted"));
    test(`a!"#$%&'()*+,./:;<=>?[\]^\`{|}~@a  -> a-a`, () =>
      expect(slugify([`a!"#$%&'()*+,./:;<=>?[\]^\`{|}~@a`])).toBe("a-a"));
  });

  describe("remove emojis", () => {
    test("aa💡bb -> aabb", () => expect(slugify(["aa💡bb"])).toBe("aabb"));
  });
  test(`Le "foo" bar -> le-foo-bar`, () =>
    expect(slugify([`Le "foo" bar`])).toBe("le-foo-bar"));
  test(`tab\ttab -> tab-tab`, () =>
    expect(slugify([`tab\ttab`])).toBe("tab-tab"));
  describe("replace special quotes", () => {
    test(`j’aime -> j-aime`, () => expect(slugify([`j’aime`])).toBe("j-aime"));
  });
  test(`tab\ttab -> tab-tab`, () =>
    expect(slugify([`tab\ttab`])).toBe("tab-tab"));
});

// Föo -> foo
// foo:bar -> foo-bar
// 💡-bar -> -bar
// j'aime -> j-aime
// Le "foo" bar -> le-foo-bar
// foo (entre) -> foo-entre
// entre () parents -> entre-parents
// a‘l -> a-l
// avec, virgule -> avec-virgule
// question? -> question
// Strip special chars
//    !"#$%&'()*+,-./:;<=>?[\]^_`{|}~
/**
 *
 * ASCII :

 !"#$%&'()*+,-./
0123456789:;<=>?
@ABCDEFGHIJKLMNO
PQRSTUVWXYZ[\]^_
`abcdefghijklmno
pqrstuvwxyz{|}~

 */
