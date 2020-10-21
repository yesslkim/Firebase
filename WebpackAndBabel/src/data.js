const users = [
  {name: 'kim', goldMember: true},
  {name: 'jack', goldMember: false},
  {name: 'lee', goldMember: true},
  {name: 'park', goldMember: false},
  {name: 'choi', goldMember: true},
];

const getGoldMembers = (users) =>{
  return users.filter(user=>{user.goldMember})
}

export default users;
// export {getGoldMembers, users as default} 라고도 쓸 수 있다.