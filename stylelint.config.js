// https://medium.com/trabe/a-comprehensive-guide-to-using-bem-with-react-14d00c199e0d
//const prettierConfig = require("./prettier.config.js");

// Transform from snake-case to TitleCase
const titleCase = (str) =>
  str.replace(/(-|^)([^-]?)/g, (match, _, char) => char.toUpperCase());

// Given a component name in snake-case, returns a regex. The regex
// must match CSS selectors conforming to the BEM naming conventions
// you want to enforce.
const customBemSelector = (component) => {
  const block = titleCase(component);
  const kebabCase = "[a-z][a-zA-Z0-9]*";
  const element = `(?:_${kebabCase})?`;
  const modifier = `(?:___${kebabCase})?`;
  const attribute = "(?:\\[.+\\])?";
  return new RegExp(`^\\.${block}${element}${modifier}${attribute}$`);
};

module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: ["stylelint-prettier", "stylelint-selector-bem-pattern"],
  rules: {
    // Ignore these because of sass-resources-loader
    //    "prettier/prettier": [true, prettierConfig],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["include", "mixin"] }],
    "plugin/selector-bem-pattern": {
      // Derive component names from the file name
      implicitComponents: true,
      // Use the default BEM preset
      preset: "bem",
      // Configures the valid selectors
      componentSelectors: {
        initial: customBemSelector,
      },
      // We allow any custom property (CSS var) names
      ignoreCustomProperties: ".*",
    },
  },
};
