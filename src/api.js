import netlifyIdentity from 'netlify-identity-widget';

const readAll = async () => {
  const user = netlifyIdentity.currentUser();
  const response = await fetch('/.netlify/functions/readTasks', {
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
  });
  return response.json();
};

const create = async (text) => {
  const user = netlifyIdentity.currentUser();
  const response = await fetch('/.netlify/functions/createTask', {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
    body: JSON.stringify(text),
  });
  return response.json();
};

const deleteTask = async (taskId) => {
  const response = await fetch(`/.netlify/functions/deleteTask/${taskId}`, {
    method: 'POST',
  });
  return response.json();
};

export default {
  readAll: readAll,
  create: create,
  deleteTask: deleteTask,
};
