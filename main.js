const API = 'https://my-cool-project7874.herokuapp.com/main';

const content = axios.create({
  baseURL: API,
  headers: {
      'Content-Type': 'application/json'
  }
});

const getTree = async () => {
  try {
    const res = await content.get();
    return res.data[0];

  } catch(err) {
    console.log('Couldn`t get users');
  }
};

const findLabelById = async (idForSearch) => {
    if(idForSearch <= 0 || idForSearch > 9) {
        console.log('White number from 1 to 9 only');
        return null;
    }
    let labelForSearch = '';
    const obj = await getTree();
    
    function traverseOfTree(obj) {
        for (var key in obj) {
            if(key == 'id' && obj[key] == idForSearch) {
                labelForSearch = obj.label;
            }
    
            if (obj[key] !== null && typeof(obj[key])=="object") {
                traverseOfTree(obj[key]);
            }
        }
    }

    traverseOfTree(obj);
    return await [idForSearch, labelForSearch];
};

const getLabel = (id) => {
    findLabelById(id)
        .then(res => {
            console.log(`Label with id ${res[0]} is ${res[1]}`)
        })
}

