let objetoJSON = {
    'a': 1,
    'b': 2
};
objetoJSON = JSON.stringify(objetoJSON);

let objetoJS = JSON.parse((objetoJSON));
console.log(objetoJS);


