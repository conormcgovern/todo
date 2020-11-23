const faunadb = require('faunadb');

const { Create, Collection, Ref } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  const data = JSON.parse(event.body);

  const task = {
    text: data.text,
    complete: false,
    userId: user.sub,
    list: Ref(Collection('lists'), data.listId),
  };

  try {
    const createdTask = await client.query(
      Create(Collection('tasks'), {
        data: task,
      })
    );
    const taskData = {
      ...createdTask.data,
      id: createdTask.ref.id,
      listId: createdTask.data.list.id,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(taskData),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
