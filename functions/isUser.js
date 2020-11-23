const faunadb = require('faunadb');

const { Exists, Match, Index } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  try {
    const exists = await client.query(
      Exists(Match(Index('user_by_id'), user.sub))
    );
    return {
      statusCode: 200,
      body: JSON.stringify(exists),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};
