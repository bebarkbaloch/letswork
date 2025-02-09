import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  {
    settings: {
      react: {
        createClass: "createReactClass", // Regex for Component Factory to use,
                                           // default to "createReactClass"
        pragma: "React",  // Pragma to use, default to "React"
        fragment: "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
        version: "detect", // React version. "detect" automatically picks the version you have installed.
                             // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                             // It will default to "latest" and warn if missing, and to "detect" in the future
        flowVersion: "0.53" // Flow version
      },
      propWrapperFunctions: [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {property: "freeze", "object": "Object"},
        {property: "myFavoriteWrapper"},
        // for rules that check exact prop wrappers
        {property: "forbidExtraProps", "exact": true}
      ],
      componentWrapperFunctions: [
        // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
        "observer", // `property`
        {property: "styled"}, // `object` is optional
        {property: "observer", "object": "Mobx"},
        {property: "observer", "object": "<pragma>"} // sets `object` to whatever value `settings.react.pragma` is set to
      ],
      formComponents: [
        // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
        "CustomForm",
        {name: "SimpleForm", "formAttribute": "endpoint"},
        {name: "Form", "formAttribute": ["registerEndpoint", "loginEndpoint"]}, // allows specifying multiple properties if necessary
      ],
      linkComponents: [
        // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
        "Hyperlink",
        {name: "MyLink", "linkAttribute": "to"},
        {name: "Link", "linkAttribute": ["to", "href"]}, // allows specifying multiple properties if necessary
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];