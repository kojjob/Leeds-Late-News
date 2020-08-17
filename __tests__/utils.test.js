const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');


describe('formatDates', () => {
  test('return an empty array when passed an empty array', () => {
    expect(formatDates([])).toEqual([])
  })
  test('returns a new array', () => {
    const input = [];
    const output = [];
    const actual = formatDates(input);
    expect(actual).toEqual(output)
  });
  test('returns a new array  and the original input is not mutated', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const output = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = formatDates(input)
    expect(actual).toEqual(output)
  });
  test('returns fomartted dates', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const formattedBlog = formatDates(input);
    expect(formattedBlog[0].created_at = new Date(input[0].created_at))
  })
});

describe('makeRefObj', () => {
  test('returns an empty object', () => {
    const list = [];
    const output = {};
    const actual = makeRefObj(list)
    expect(typeof output).toEqual("object")
  })
  test("returns the original input, no mutation ", () => {
    const list = [];
    makeRefObj(list, "article_id", "title");
    expect(list).toEqual([]);
  });
  test("return a reference object", () => {
    const list = [{
      article_id: 1,
      title: "A"
    }];
    expect(makeRefObj(list, "title", "article_id")).toEqual({
      A: 1
    });
  });
});

describe('formatComments', () => {
  test("returns an empty array when passed an empty array", () => {
    expect(formatComments([])).toEqual([])
  });
  test("returns a new empty array, when passed an empty array", () => {
    const comments = [];
    const articleRef = {};
    const actual = formatComments(comments, articleRef);
    const output = [];
    expect(actual).toEqual(output);
    expect(actual).not.toBe(comments);
  });
  test("returns comments and articleRef input without mutation", () => {
    const comments = [{
      body: 'This morning, I showered for nine minutes.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 975242163389,
    }];
    const articleRef = {
      A: 1,
    };
    formatComments(comments, articleRef);
    expect(comments).toEqual([{
      body: 'This morning, I showered for nine minutes.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 975242163389,
    }, ]);
    expect(articleRef).toEqual({
      A: 1,
    });
  });

});


test("changes some keys in comment array and use lookUp objects", () => {
  const comments = [{
    body: 'This morning, I showered for nine minutes.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'butter_bridge',
    votes: 16,
    created_at: 975242163389,
  }];
  const articleRef = {
    'Living in the shadow of a great man': 1,
  };
  expect(formatComments(comments, articleRef)).toEqual([{
    body: 'This morning, I showered for nine minutes.',
    article_id: 1,
    author: 'butter_bridge',
    votes: 16,
    created_at: new Date(975242163389),
  }])
})