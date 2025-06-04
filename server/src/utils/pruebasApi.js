/* 

Archivo de pruebas de API.

*/


import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

const API_TOKEN =process.env.CLICKUP_API_TOKEN;

const OPTIONS = {
  method: "GET",
  headers: {
    accept: 'application/json',
    Authorization: API_TOKEN,
  },
};

const getUser = async () => {
  const url = `https://api.clickup.com/api/v2/user/`;
  const results = await fetch(url, OPTIONS);
  console.log('This is my user:');
  const { user } = await results.json();
  console.table(user);
  return user;
};

const user = await getUser();
console.log("User:",user);

// https://developer.clickup.com/reference/getauthorizedteams
// This grabs the workspaces from that user
// One of the fields that it yields is the teamId, which is used for most other calls
// On project creation on the app, there should be a check to grab that workspace and store its teamId, in order to make the other calls

const getWorkSpaces = async () => {
  const url = `https://api.clickup.com/api/v2/team/`;
  const results = await fetch(url, OPTIONS);
  console.log('These are my workspaces:');
  const { teams } = await results.json();
  console.table(teams);
  return teams;
};

const workspaces = await getWorkSpaces();
const teamId=workspaces[0].id;
console.log("TeamID:",teamId);

// Example value: 
// const teamId = '90151224505';

// https://developer.clickup.com/reference/getspaces
// This grabs the spaces, in our case that'd be "Terraplanistas"
const getSpaces = async (teamId) => {
  const url = `https://api.clickup.com/api/v2/team/${teamId}/space`;
  const results = await fetch(url, OPTIONS);
  // console.log('These are my spaces:');
  const { spaces } = await results.json();
  // console.log(spaces);
  return spaces;
};

const spaces = await getSpaces(teamId);
const spaceId=spaces[0].id;
console.log("spaceId:",spaceId);

// Example value: 
// const spaceId = '90154928382';
// https://developer.clickup.com/reference/getfolderlesslists
// This grabs the lists. In our project that's client/server/misc. It grabs the ones outside folders. We gotta ask Terra about this.
const getProjects = async (spaceId) => {
  const url = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
  const results = await fetch(url, OPTIONS);
  console.log('These are the projects:');
  const { lists } = await results.json();
  console.table(lists);
  return lists;
};

const projectList = await getProjects(spaceId);
const projectId=projectList[0].id;
console.log ("projectId:", projectId);

// Example value: 
// const listId = '901511683227';

// https://developer.clickup.com/reference/createtask
// Creates a task. Whole lot of fields to fill up here.
// The rest of the Api calls we need are in the same folder of the API docs

const getTasks = async (projectId) => {
  const url = `https://api.clickup.com/api/v2/list/${projectId}/task`;
  const results = await fetch(url, OPTIONS);
  console.log("These are the tasks:");
  const { tasks } = await results.json();
  console.log(tasks);
  return tasks;
};

const task = await getTasks(projectId);


//RequestType Status Request# InputDate Requester Device Browser Request Page Screenshot TerraComments