## 1. Workflow Git

Ce projet utilise un workflow basé sur des branches de fonctionnalité et des Pull Requests :

- La branche `main` est protégée (aucun push direct, merge uniquement via PR).
- Pour chaque évolution, une branche de feature est créée depuis `main` :
  - `git checkout -b feature/nom-de-la-feature`
- Les changements sont committés avec des messages au format : `type: description`
  - Exemples : `feat: add request types routes`, `test: add API tests`, `docs: update README`
- Une Pull Request est ouverte vers `main` et doit passer tous les checks CI avant merge.
- La branche de feature est supprimée après le merge.

Ce workflow permet :
- de garder `main` toujours stable,
- de valider les changements avant intégration,
- d’avoir un historique de commits et de PR propre et lisible.

## 2. CI/CD

Une pipeline GitHub Actions est configurée dans `.github/workflows/ci.yml`.

Elle contient deux jobs principaux :

- **code-quality**
  - Installe les dépendances Node.js
  - Vérifie la qualité du code avec ESLint (`npm run lint`)
  - Vérifie le formatage avec Prettier (`npm run format:check`)
  - Le job échoue si des erreurs de lint ou de formatage sont détectées

- **tests**
  - Lance un service MongoDB dans le workflow
  - Exécute la suite de tests Jest avec `npm test`
  - Génère un rapport de couverture
  - Le job échoue si les tests échouent ou si la couverture minimale configurée n’est pas atteinte

Ces deux jobs sont configurés comme **required checks** pour la branche `main`, ce qui signifie qu’une Pull Request ne peut pas être mergée tant que :
- la qualité du code n’est pas valide,
- tous les tests ne passent pas.
