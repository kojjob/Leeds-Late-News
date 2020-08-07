exports.formatDates = list => {
  const newList = [...list]

  if (list.length === 0) return []
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

  const updatedComments = comments.map((comment) => {
    const newComment = {...comment };
    newComment.article_id = articleRef[comment.belongs_to];
    delete newComment.belongs_to;
    
   
    newComment.author = comment.created_by;
    delete newComment.created_by;
    
    newComment.created_at = new Date(comment.created_at);
    return newComment;
  });
  return updatedComments;
};