let person1 = {
  name: "jack",
  age: 18
};

let person2 = {...person1, name: "curry"};

person1.name = "小学生";
//剩余参数
function sum(firstNum, ...num) {
  return num.reduce((preVal, curVal) => {
    return preVal + curVal;
  }, firstNum);
}
const res = sum(10, 1,2,3,4,5);


console.log(res);
// console.log(person1);
// console.log(person2);