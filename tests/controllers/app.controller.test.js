const chai = require("chai")
const expect = chai.expect
const sinon = require("sinon")
// import our getIndexPage function
const indexPage = require("../../controllers/app.controller.js")

const user = {
  addUser: name => {
    this.name = name
  }
}

describe("AppController", function() {
  describe("getIndexPage", function() {
    it("should send hey when user is logged in", function() {
      let user = {
        isLoggedIn: function() {}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true)

      // pass user into the req object
      let req = {
        user: user
      }

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        send: function() {}
      }

      const mock = sinon.mock(res)
      // build how we expect it work
      mock
        .expects("send")
        .once()
        .withExactArgs("Hey")

      indexPage.getIndexPage(req, res)
      expect(isLoggedInStub.calledOnce).to.be.true

      // verify that mock works as expected
      mock.verify()
    })

    it("should return index page", function() {
      let user = {
        isLoggedIn: function() {}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true)

      let req = {
        user: user
      }
      let res = {
        send: sinon.spy()
      }

      indexPage.getIndexPage(req, res)
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true
      // expect to get argument `bla` on first call
      expect(res.send.firstCall.args[0]).to.equal("Hey")

      // assert that the stub is logged in at least once
      expect(isLoggedInStub.calledOnce).to.be.true
    })

    it("should return something else when use is NOT logged in", function() {
      let user = {
        isLoggedIn: function() {}
      }
      // stub isLoggedIn function make it return false always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(false)

      let req = {
        user: user
      }

      let res = {
        send: sinon.spy()
      }

      indexPage.getIndexPage(req, res)
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true
      expect(res.send.firstCall.args[0]).to.equal(
        "Ooops. You need to log in to access this page"
      )

      // assert that the stub is logged in at least once
      expect(isLoggedInStub.calledOnce).to.be.true
    })
  })
})

describe("User", function() {
  describe("addUser", function() {
    it("should add a user", function() {
      sinon.spy(user, "addUser")
      user.addUser("John Doe")

      // lets log `addUser` and see what we get
      expect(user.addUser.calledOnce).to.be.true
    })
  })
})
