var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var obj = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4
}
var arr = [1,3,5,7,9,11,13,15,17,19]
// 添加测试
suite.add('each', function() {
        for(var i=0;i<arr.length;i++){
            // console.log(i)
        }
    })
    .add('for-in', function() {
        for(var i in arr){
            // console.log(i)
        }
    })
// add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
// run async
    .run({ 'async': true });