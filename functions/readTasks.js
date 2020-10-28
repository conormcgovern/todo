const faunadb = require('faunadb');

const { Paginate, Match, Index, Call, Function, Get } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const taskRefs = await client.query(
      Paginate(
        Match(Index('tasks_by_user'), Call(Function('getUser'), user.sub))
      )
    );
    const tasks = await client.query(
      taskRefs.data.map((ref) => {
        return Get(ref);
      })
    );
    const tasksData = tasks.map((task) => {
      return { ...task.data, id: task.ref.id };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(tasksData),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
