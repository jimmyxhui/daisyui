import fs from "node:fs"
import { diffString } from "json-diff"

const translationDir = "src/translation"
const chunks = ["common", "home", "docs", "components", "other"]

fs.readdir(translationDir, (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  const langs = [
    ...new Set(
      files
        .filter((file) => file.endsWith(".common.json"))
        .map((file) => file.replace(".common.json", "")),
    ),
  ].filter((lang) => lang !== "en")

  for (const lang of langs) {
    chunks.forEach((chunk) => {
      const enFile = `${translationDir}/en.${chunk}.json`
      const langFile = `${translationDir}/${lang}.${chunk}.json`
      const diff = diffString(
        JSON.parse(fs.readFileSync(enFile, "utf8")),
        JSON.parse(fs.readFileSync(langFile, "utf8")),
        { keysOnly: true },
      )
      if (diff) {
        console.log(`EN.${chunk} 🆚 ${lang.toUpperCase()}.${chunk}\n${diff}`)
      }
    })
  }
})
