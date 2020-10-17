/***************
 **adding HTML**
 ***************/

/* (2)번
 * 레시피 데이터 중 title 사용해보기
 * function을 만든다. recipe.title로 타이틀만 받아오기 
 * 여기서 recipe = (1)번의 doc.data() 즉 object를 받는다.
 */

const list = document.querySelector('ul');
const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  //참고로 created_at은 timestamp여서 __proto__에 toDate()메소드가 있다
  let html = `
  <li data-id="${id}">
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button type="button" class="btn btn-danger btn-sm my-2">delete</button>
  </li>
  `;
  list.innerHTML += html;
}

/* (1)번
 * db는 const db = firebase.firestore(); 요거임. index.html에서 시작
 * collection은 내가 만든 collection불러 낼 때 사용
 * get()은 레시피 컬렉션 가져올 때 사용 - Promise 반환
 */

//요건 한번만 받아올 때 사용 실시간은 아래에 참고

// db.collection('recipes').get().then(snapshot => {
//   //get the data : ex. 첫번째 데이터 받아오기 snapshot.docs[0].data()
//   // get the data id : ex. docs.id
//   snapshot.docs.forEach(doc => {
//     addRecipe(doc.data(), doc.id);
//   })

// }).catch(err => {
//   console.log(err);
// })

/********************************
 *REAL TIME LISTENER : 실시간반영 - deleting html*
 ********************************/

const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll('li')
  recipes.forEach(recipe => {
    if (recipe.getAttribute('data-id') === id) {
      recipe.remove()
    }
  })
}

/********************************
 *REAL TIME LISTENER : 실시간반영 - Adding data*
 ********************************/
const unsub = db.collection('recipes').onSnapshot(snapshot => {
  //요건 document가 변경될때마다 스냅샷 된것을 보여줌

  snapshot.docChanges().forEach(change => {
    console.log(change)
    const doc = change.doc;
    //type property가 있음 
    if (change.type === 'added') {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === 'removed') {
      deleteRecipe(doc.id)
    }
  })
})

//unsub from database changes
const button = document.querySelector('button')
button.addEventListener('click', () => {
  unsub();
  console.log('unsub')
})


/***************
 **SAVING DATA**
 ***************/
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const now = new Date();
  const recipe = {
    title: form.recipe.value, //여기서 recipe는 input의 ID임.
    created_at: firebase.firestore.Timestamp.fromDate(now),
    //파이어 베이스 양식이 있기 때문에 이런식으로 작성해야됨
  };

  db.collection('recipes').add(recipe).then(() => {
    //parameter 필요없음. 데이터를 가져오는게 아니라 입력하는 과정이기 때문
    //add(recipe)의 레시피는 폼 안에 object인 레시피
    console.log('recipes added')

  }).catch(err => {
    console.log(err)
  })
})

/***************
 **DELETING DATA**
 ***************/

list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.parentElement.getAttribute('data-id');
    //이것도 프로미스 반환
    db.collection('recipes').doc(id).delete().then(() => {
      console.log('delete it')
    }).catch(err => {
      console.log(err)
    });
  }
})