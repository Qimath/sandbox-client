module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
};
