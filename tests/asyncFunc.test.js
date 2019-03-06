const chai = require("chai")
const expect = chai.expect
chai.use(require("chai-as-promised"))

// This is just async func that takes in a bool
// and that return a promise
function someMadeUpAsyncFunc(boolValue) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(boolValue ? "You get a sweet :)" : "You get nothing!!")
    }, 0)
  })
}

// Added the `only` tag to have only this set of tests to run
describe.only("AsyncTest", function() {
  it("should return `You get a sweet :)` if `true` is passed in", function() {
    expect(someMadeUpAsyncFunc(true)).to.eventually.equal("You get a sweet :)")
  })
  it("should return `You get nothing!!` if `false` is passed in", function() {
    expect(someMadeUpAsyncFunc(false)).to.eventually.equal("You get nothing!!")
  })
})
