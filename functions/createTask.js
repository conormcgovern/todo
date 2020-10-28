const faunadb = require('faunadb');

const { Create, Collection, Call, Function } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const taskText = JSON.parse(event.body);

  const task = {
    text: taskText,
    complete: false,
    user: Call(Function('getUser'), user.sub),
  };

  try {
    const createdTask = await client.query(
      Create(Collection('tasks'), {
        data: task,
      })
    );
    const taskData = { ...createdTask.data, id: createdTask.ref.id };
    return {
      statusCode: 200,
      body: JSON.stringify(taskData),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
