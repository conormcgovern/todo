const faunadb = require('faunadb');
const getId = require('./utils/getId');

const { Delete, Ref, Collection } = faunadb.query;

exports.handler = async function (event) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const taskId = getId(event.path);
  try {
    const response = await client.query(
      Delete(Ref(Collection('tasks'), taskId))
    );
    console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
