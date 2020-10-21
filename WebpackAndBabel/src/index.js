import {styleBody, addTitle, contact} from './dom';
import users, {getGoldMembers} from './data';

console.log(users);

const gold = getGoldMembers(users);

console.log(gold)