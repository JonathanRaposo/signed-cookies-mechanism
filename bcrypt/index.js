
const bcrypt = require('bcryptjs');

const john_password = 'John123';
const Ann_password = 'Ann123';
const Peter_password = 'Peter123'

const salt = bcrypt.genSaltSync(10);
const john_hash = bcrypt.hashSync(john_password, salt);
const ann_hash = bcrypt.hashSync(Ann_password, salt);
const peter_hash = bcrypt.hashSync(Peter_password, salt);

console.log('john hash:', john_hash);
console.log('anne hash:', ann_hash);
console.log('peter hash:', peter_hash)

const johnPass = '$2b$10$4Pw8HjtDAIcOvaQ6AJJ0H.zC5643AtYXqMjFGf7AdETHBUUylI7LG';
const annePass = '$2b$10$4Pw8HjtDAIcOvaQ6AJJ0H.1f4o2J7HwciXYB08r5zYCTkuPbvqjpW';
const peterPass = '$2b$10$4Pw8HjtDAIcOvaQ6AJJ0H.yDBJC8i5iVYUbZxzRPSzmCtHVWKe/ni';


console.log('is John?', bcrypt.compareSync(john_password, johnPass))
console.log('is Ann?', bcrypt.compareSync(Ann_password, annePass))
console.log('is Peter?', bcrypt.compareSync(Peter_password, peterPass))
