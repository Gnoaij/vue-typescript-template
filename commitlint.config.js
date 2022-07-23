module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => ['Initial commit'].includes(commit.trim())]
}
