"use strict";
// Сomposition of functions
// Let's say you have separate functions that ultimately calculate the discount:

const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);

// As a result, we will get the result, but this chain is not entirely convenient. 
// What if there is a lot of action? You can run it like this:
// const discount = normalizePrice(divide100(multiply20(200)));
// But with an increase in the number of functions, this will turn into an unreadable hell.
// The challenge is to write a compose function that takes all of these functions and does the same. 
// That is, to organize the composition of functions.
// There can be any number of functions and they can take only one initial argument.

const compose = (...args) =>(x) =>{
    let rez = 0;
    for (let i = args.length-1; i !=-1; i--){
        if (i === args.length-1){
            rez = args[i](x);
        } else {
            rez = args[i](rez);
        }
    }
    return rez;
};
const discount = compose(normalizePrice, divide100, multiply20);
console.log(discount(200.0));


// Second task. Write a composeWithArgs composition function that takes 
// as many arguments as you like at the beginning. Example:

// const add1 = function(a){return a + 1}
// const addAll3 = function(a,b,c){return a + b + c}
// composeWithArgs(add1,addAll3)(1,2,3)  => return 7

const add1 = function(a){
    return a + 1;
};
const addAll3 = function(a,b,c){
    return a + b + c;
};
const composeWithArgs = (...funcs) =>(...args) =>{
    let rez = 0;
    for (let i = funcs.length-1; i !=-1; i--){
        if (i === funcs.length-1){
            rez = funcs[i](...args);
        } else {
            rez = funcs[i](rez);
        }
    }
    return rez;
};
const rez = composeWithArgs(add1,addAll3)(1,2,3);
console.log(rez);



setTimeout(() => console.log("timeout"));


'use strict';
 
function getSum(a, b) {
    function sum() {
        console.log(this.a);
        return a + b;
    }
 
    console.log(sum());
}
 
getSum(4, 5);