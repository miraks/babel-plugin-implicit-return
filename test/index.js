import fs from "fs"
import path from "path"
import { expect } from "chai"
import { transformFileSync } from "babel-core"
import plugin from '../src/index'

describe("Check", () => {
  const fixturesDir = path.join(__dirname, "fixtures")

  fs.readdirSync(fixturesDir).forEach((caseName) => {
    it(caseName, () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      const actualPath = path.join(fixtureDir, "actual.js")
      const actual = transformFileSync(actualPath, {
        babelrc: false,
        plugins: [
          "syntax-object-rest-spread",
          "syntax-async-functions",
          "syntax-async-generators",
          "transform-react-jsx",
          "syntax-flow",
          plugin
        ]
      }).code
      const expected = fs.readFileSync(path.join(fixtureDir, "expected.js")).toString()

      expect(actual.trim()).to.eq(expected.trim())
    })
  })
})
