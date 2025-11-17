const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // On ignore quelques dossiers
  {
    ignores: ['node_modules/**', 'coverage/**'],
  },
  // Config principale
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Règles recommandées de base d'ESLint
      ...js.configs.recommended.rules,
      // Tu peux ajouter tes règles perso ici si besoin
      // 'no-console': 'warn',
    },
  },
];
