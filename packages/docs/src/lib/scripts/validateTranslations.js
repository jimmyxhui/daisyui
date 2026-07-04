import { validateTranslations } from "./translationConfig.js"

const issues = validateTranslations()

if (!issues.length) {
  console.log("Translation files are valid")
  process.exit(0)
}

for (const issue of issues) {
  console.error(`[${issue.type}] ${issue.message}`)
}

process.exit(1)

