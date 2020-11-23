const faunadb = require('faunadb');

const {
  Paginate,
  Match,
  Index,
  Call,
  Function,
  Get,
  Map,
  Lambda,
  Var,
} = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const tasks = await client.query(
      Map(
        Paginate(
          Match(Index('tasks_by_user'), Call(Function('getUser'), user.sub))
        ),
        Lambda('ref', Get(Var('ref')))
      )
    );
    const tasksData = tasks.data.map((task) => {
      return { ...task.data, id: task.ref.id, listId: task.list.ref.id };
    });
    console.log(tasksData);
    return {
      statusCode: 200,
      body: JSON.stringify(tasksData),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
