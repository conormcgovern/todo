const faunadb = require('faunadb');
const getId = require('./utils/getId');

const { Update, Ref, Collection } = faunadb.query;

exports.handler = async function (event) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const taskId = getId(event.path);
  const data = JSON.parse(event.body);
  try {
    const response = await client.query(
      Update(Ref(Collection('tasks'), taskId), {
        data: data,
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
