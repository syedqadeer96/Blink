const printName=(name)=>"hi "+name;
console.log(printName("syed"));


const printBill=(name,bill)=>
    `hi ${name} plz pay ${bill}`;

console.log(printBill("syed",100));


const person = {
    name: "Noam Chomsky",
    age: 92
}
const {name,age}=person;
console.log(name,age);