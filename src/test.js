function tryPromise(aaa){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if((Math.random() * 10) > 5){
        resolve('got it' + aaa);
      }else{
        reject('sorry~' + aaa);
      }
    },1000)
  })
}

tryPromise('--test').then(res => console.log(res) , fail => console.log(fail + 'fail')).catch(e => console.log(e))