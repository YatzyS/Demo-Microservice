const assert = require("chai").assert
const getWebToken = require("../utilities/webtokens").getWebToken
const authenticateToken = require("../utilities/webtokens").authenticateToken

describe("Check webtoken functions", function() {
    let token
    var user = { "uname": "hello", "pass": "hello"}
    it("should generate new token for the object", function() {
        token = getWebToken(user)
        assert.isNotNull(token)
    })
    it("should authenticate the generated token", function() {
        authenticateToken(token, function(err, object) {
            assert.isNull(err)
        })
    })
})