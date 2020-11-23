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

const create = async (text, listId) => {
  const user = netlifyIdentity.currentUser();
  const data = {
    text: text,
    listId: listId,
  };
  const response = await fetch('/.netlify/functions/createTask', {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteTask = async (taskId) => {
  const response = await fetch(`/.netlify/functions/deleteTask/${taskId}`, {
    method: 'POST',
  });
  return response.json();
};

const update = async (taskId, data) => {
  const response = await fetch(`/.netlify/functions/updateTask/${taskId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

const readLists = async () => {
  const user = netlifyIdentity.currentUser();
  const response = await fetch('/.netlify/functions/readLists', {
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
  });
  return response.json();
};

const isUser = async () => {
  const user = netlifyIdentity.currentUser();
  try {
    const response = await fetch('/.netlify/functions/isUser', {
      headers: new Headers({
        Authorization: 'Bearer ' + user.token.access_token,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const createUser = async () => {
  const user = netlifyIdentity.currentUser();
  const response = await fetch('/.netlify/functions/createUser', {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
  });
  return response.json();
};

const createList = async (data) => {
  const user = netlifyIdentity.currentUser();
  try {
    const response = await fetch('/.netlify/functions/createList', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + user.token.access_token,
      }),
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async () => {
  const user = netlifyIdentity.currentUser();
  console.log(netlifyIdentity.currentUser());
  const response = await fetch('/.netlify/functions/updateUser', {
    headers: new Headers({
      Authorization: 'Bearer ' + user.token.access_token,
    }),
  });
  return response.json();
};

export default {
  readAll: readAll,
  create: create,
  deleteTask: deleteTask,
  update: update,
  readLists: readLists,
  isUser: isUser,
  createUser: createUser,
  createList: createList,
  updateUser: updateUser,
};
