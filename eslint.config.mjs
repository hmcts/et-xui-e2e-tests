export default [{
 languageOptions: {
   globals: {
     'process': true
   },
   parserOptions: {
     ecmaVersion: 'latest',
     sourceType
       :
       'module',
     ecmaFeatures
       :
       {
         jsx: true,
       }
   }
 },

plugins: {
   prettier: {
     useTabs: true,
     semi: true,
     singleQuote: true,
   },
  codeceptjs: {
     enabled: true
  }
},

}];
