exports.formatDates = list => {
  const newList = [...list]

  if(list.length === 0) return []
  newList.map((blog) => ({
    title: blog.title,
    topic: blog.topic,
    author: blog.author,
    body: blog.body,
    created_at: new Date(blog.created_at),
    votes: blog.votes
  }))
  return newList
};

exports.makeRefObj = (list, targetgKey, targetValue) => {
  const lookUp = {};
  list.forEach((article) => (lookUp[article[targetgKey]] = article[targetValue]));
  return lookUp;
};

exports.formatComments = (comments, articleRef) => {

  return comments.map((comment) => {
    const newComments = { ...comment};

    newComments.article_id = articleRef[comment.belongs_to];
    delete newComments.belongs_to;

    newComments.created_at = new Date(newComments.created_at);
    
    newComments.author = newComments.created_by;
    delete newComments.created_by;
    console.log(newComments)
    return newComments;
  });
};