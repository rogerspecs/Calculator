
// console.log(addingTwoANdThree());


function addition(firt_number, second_number){
    var y = firt_number + second_number;
    // console.log(y)

    return y;
}

var x = addition(7, 4);
// console.log(x)

function addingTwoANdThree(){
    var res = 4 + 7;
    // console.log(res);
    return res;
}

// var result = addingTwoANdThree();
// console.log(result)

var value = 57;     
var value1 = 59;

(function(value, value1){
    var result = value + value1;
    // console.log(result);

})(value, value1);

// Arrow function with arguments
let added = (a, b) => a + b;

var result = added(51, 3);
// console.log(result)

// Arrow function without arguments
let addedd = () => 13 + 5;

// console.log(addedd())

function showResult(result){
    console.log(result);
}

showResult(addedd())

var num1 = 0;

var answer = (num1 === 0) ? "True" : "False";
console.log(answer)
