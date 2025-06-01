import fetch from 'node-fetch';

const API_TOKEN = process.env.CLICKUP_API_TOKEN;

// https://developer.clickup.com/reference/getauthorizedteams
// This grabs the workspaces from that user
// One of the fields that it yields is the teamId, which is used for most other calls
// On project creation on the app, there should be a check to grab that workspace and store its teamId, in order to make the other calls

const getTeamId = async (API_TOKEN) => {
  const url = `https://api.clickup.com/api/v2/team/`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN
    }
  };
  const results = await fetch(url, options);
  console.log('These are the workspaces:');
  const { teams } = await results.json();
  console.table(teams);
  return teams;
};

// getTeamId(API_TOKEN);

// Example value: 
// const teamId = '90151224505';

// https://developer.clickup.com/reference/getspaces
// This grabs the spaces, in our case that'd be "Terraplanistas"
const getSpaces = async (API_TOKEN, teamId) => {
  const url = `https://api.clickup.com/api/v2/team/${teamId}/space`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN
    }
  };
  const results = await fetch(url, options);
  console.log('These are the spaces:');
  const { spaces } = await results.json();
  console.log(spaces[0]);
  return spaces;
};

// getSpaces(API_TOKEN, teamId);

// Example value: 
// const spaceId = '90154928382';

// https://developer.clickup.com/reference/getfolderlesslists
// This grabs the lists. In our project that's client/server/misc. It grabs the ones outside folders. We gotta ask Terra about this.
const getFolderlessList = async (API_TOKEN, spaceId) => {
  const url = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN
    }
  };
  const results = await fetch(url, options);
  console.log('These are the lists:');
  const { lists } = await results.json();
  console.table(lists);
  return lists;
};

// getFolderlessList(API_TOKEN, spaceId);

// Example value: 
// const listId = '901511683227';

// https://developer.clickup.com/reference/createtask
// Creates a task. Whole lot of fields to fill up here.
// The rest of the Api calls we need are in the same folder of the API docs
const createTask = async (API_TOKEN, listId) => {
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN
    }
  };
  const results = await fetch(url, options);
  console.log('This is the task:');
  const { task } = await results.json();
  console.table(task);
  return task;
};

// createTask(API_TOKEN, listId);