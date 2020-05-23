chai = require("chai")
assert = chai.assert
chaiHttp = require("chai-http")
should = chai.should();
chai.use(chaiHttp)
server = require("../app")

describe("Login Scenarios", () => {
    describe("Login Positive", () => {
        it("it should create a webtoken", (done) => {
            chai.request(server)
                .post("/login")
                .set("Content-Type","application/json")
                .send({
                    "username": "test",
                    "password": "test"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a("object")
                    assert.isNotNull(res.body.accessToken)
                    done()
                })
        })
    })

    describe("Login Negative Scenariao", () => {
        it("it should give 404 invalid input", (done) => {
            chai.request(server)
                .post("/login")
                .set("Content-Type","application/json")
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
})

describe("Thumbnail scenarios", () => {
    describe("Thumbnail", () => {
        it("it should make thumbnail from given image", (done) => {
            var user = {
                "uname": "test",
                "pass": "test"
            }
            var token = require("../utilities/webtokens").getWebToken(user)
            chai.request(server)
                .get("/thumbnail")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer "+token)
                .send({
                    "url": "https://via.placeholder.com/150.jpg"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        }).timeout(10000)
    })

    describe("Thumbnail Negative scenarios", () => {
        it("it should give 401 No token found", (done) => {
            chai.request(server)
                .get("/thumbnail")
                .set("Content-Type","application/json")
                .send({
                    "url": "https://via.placeholder.com/150.jpg"
                })
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    
        it("it should give 403 Invalid token", (done) => {
            chai.request(server)
                .get("/thumbnail")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer d123")
                .send({
                    "url": "https://via.placeholder.com/150.jpg"
                })
                .end((err, res) => {
                    res.should.have.status(403)
                    done()
                })
        })
    
        it("it should give 404 No URL found in request", (done) => {
            var user = {
                "uname": "test",
                "pass": "test"
            }
            var token = require("../utilities/webtokens").getWebToken(user)
            chai.request(server)
                .get("/thumbnail")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer "+token)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })

})

describe("JsonPatch Scenarios", () => {
    describe("JsonPatch", () => {
        it("it should apply patch to json", (done) => {
            var user = {
                "uname": "test",
                "pass": "test"
            }
            var token = require("../utilities/webtokens").getWebToken(user)
            chai.request(server)
                .get("/jsonPatch")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer "+token)
                .send({
                    "json": {
                                "baz": "qux",
                                "foo": "bar"
                            },
                    "patch":[
                                { "op": "replace", "path": "/baz", "value": "boo" }
                            ]
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a("object")
                    assert.deepEqual(res.body, {
                        "baz": "boo",
                        "foo": "bar"
                    })
                    done()
                })
        })
    })

    describe("JsonPath Negative scenarios", () => {
        it("it should give 401 No token found", (done) => {
            chai.request(server)
                .get("/jsonPatch")
                .set("Content-Type","application/json")
                .send({
                    "json": {
                                "baz": "qux",
                                "foo": "bar"
                            },
                    "patch":[
                                { "op": "replace", "path": "/baz", "value": "boo" }
                            ]
                })
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })

        it("it should give 403 Invalid token", (done) => {
            chai.request(server)
                .get("/jsonPatch")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer abcd")
                .send({
                    "json": {
                                "baz": "qux",
                                "foo": "bar"
                            },
                    "patch":[
                                { "op": "replace", "path": "/baz", "value": "boo" }
                            ]
                })
                .end((err, res) => {
                    res.should.have.status(403)
                    done()
                })
        })

        it("it should give 404 No data found in request", (done) => {
            var user = {
                "uname": "test",
                "pass": "test"
            }
            var token = require("../utilities/webtokens").getWebToken(user)
            chai.request(server)
                .get("/jsonPatch")
                .set("Content-Type","application/json")
                .set("Authorization", "Bearer "+token)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    }) 
})