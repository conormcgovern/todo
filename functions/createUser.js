const faunadb = require('faunadb');

const { Create, Collection } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const data = {
    id: user.sub,
    email: user.email,
    metadata: user.user_metadata,
  };
  try {
    const response = await client.query(
      Create(Collection('users'), { data: data })
    );
    console.log(response);
    const userData = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(userData),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
