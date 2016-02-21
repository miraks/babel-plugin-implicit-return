import fs from "fs"
import path from "path"
import { expect } from "chai"
import { transformFileSync } from "babel-core"

describe("Add return", () => {
  const fixturesDir = path.join(__dirname, "fixtures")
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(caseName, () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      const actualPath = path.join(fixtureDir, "actual.js")
      const actual = transformFileSync(actualPath).code
      const expected = fs.readFileSync(path.join(fixtureDir, "expected.js")).toString()

      expect(actual.trim()).to.eq(expected.trim())
    })
  })
})
