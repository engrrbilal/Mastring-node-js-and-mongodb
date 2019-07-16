const lib = require('../exercise1');

// exercise 1 fizzbuzz
describe('fizzBuzz', () => {
    it('should throw if type of input is not number' , () => {
         const args = ['anyStr',undefined,null,{}];
         args.forEach(a => {
             expect(()=>{lib.fizzBuzz(a)}).toThrow()
         });// const result = lib.fizzBuzz(5);
    })
    it('should return FizzBuzz if input is divisible by 3 & 5' , () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    })
    it('should return Fizz if input is divisible by only 3 and return Buzz if input is divisible by only  5' , () => {
        expect(lib.fizzBuzz(3)).toBe('Fizz');
        expect(lib.fizzBuzz(5)).toBe('Buzz');
    })
})