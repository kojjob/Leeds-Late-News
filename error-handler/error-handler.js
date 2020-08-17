exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({
      msg: err.msg
    });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code) {
    console.log(err);
    const psqlErrors = {
      "22P02": {
        status: 400,
        msg: createMessage(err),
      },
      "23502": {
        status: 400,
        msg: "Error:400, Bad Request",
      },
      "23503": {
        status: 404,
        msg: "Error article_id does not exist",
      },
      "42703": {
        status: 400,
        msg: createMessage(err),
      },
    };
    const thisError = psqlErrors[err.code];
    if (thisError) {
      res.status(thisError.status).send({
        msg: thisError.msg
      });
    } else {
      next(err);
    }
  }
};

function createMessage(err) {
  return err.message.split("-")[1];
}

exports.send405Error = (req, res, next) => {
  res.status(405).send({
    msg: "Error 405, method not allowed"
  });
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    msg: "Error 500, internal server error"
  });
};
