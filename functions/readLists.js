const faunadb = require('faunadb');

const { Paginate, Match, Index, Get, Map, Lambda, Var, Let } = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const lists = await client.query(
      Map(
        Paginate(Match(Index('lists_by_userId'), user.sub)),
        Lambda(
          'ref',
          Let(
            {
              list: Get(Var('ref')),
              tasks: Map(
                Paginate(Match(Index('tasks_by_list'), Var('ref'))),
                Lambda('taskRef', Get(Var('taskRef')))
              ),
            },
            {
              list: Var('list'),
              tasks: Var('tasks'),
            }
          )
        )
      )
    );

    const listsData = lists.data.map((obj) => {
      return {
        ...obj.list.data,
        id: obj.list.ref.id,
        tasks: obj.tasks.data.map((task) => {
          return {
            ...task.data,
            id: task.ref.id,
            listId: task.data.list.id,
          };
        }),
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(listsData),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
