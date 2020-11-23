const faunadb = require('faunadb');

const { Create, Collection } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const data = JSON.parse(event.body);
  const list = {
    name: data.name,
    showCompleted: false,
    userId: user.sub,
  };

  try {
    const response = await client.query(
      Create(Collection('lists'), {
        data: list,
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
