### Détails techniques du Backend développé avec NestJS

Dans le cadre de ce projet, j'ai développé un backend complet et robuste avec **NestJS** (framework Node.js basé sur Express et TypeScript), choisi pour son architecture modulaire, sa scalabilité et ses outils intégrés de validation et gestion d’erreurs.

Voici les différentes fonctionnalités et composants implémentés :

#### 1. Système d’inscription (Register)

Permet la création d’un nouveau compte utilisateur.  
Fonctionnalités :

- Route : `POST /users/`
- Validation automatique des données via DTO et Class Validator
- Vérification que le nom d’utilisateur n’existe pas déjà
- Réponse 201 Created en cas de succès
- Réponse 409 Conflict avec message clair si l’utilisateur existe déjà : "Cet utilisateur existe déjà"

#### #### 2. Système de connexion (Login)

Authentification classique par nom d’utilisateur et mot de passe.  
 Fonctionnalités :

- Route : `POST /users/login`
- Recherche de l’utilisateur par username
- Comparaison du mot de passe saisi avec celui en base
- Retour de l’objet utilisateur complet (id + username) en cas de succès
- Messages d’erreur précis et en français :
  - "Nom d'utilisateur incorrect"
  - "Mot de passe incorrect"

#### 3. Réinitialisation du mot de passe (Forget Password)

Permet à l’utilisateur de changer son mot de passe sans être connecté.  
Fonctionnalités :

- Route : `Put /users/reset-password`
- Recherche de l’utilisateur par nom d’utilisateur
- Mise à jour du mot de passe si l’utilisateur existe
- Confirmation que les deux nouveaux mots de passe correspondent (côté frontend)
- Réponses claires :
  - 200 OK → "Mot de passe mis à jour avec succès"
  - 404 Not Found → "Utilisateur non trouvé"

#### 4. Gestion centralisée des erreurs et sécurité

- Utilisation des exceptions natives NestJS (`UnauthorizedException`, `ConflictException`, `NotFoundException`)
- Messages d’erreur renvoyés en français et directement exploitables par le frontend mobile
- CORS activé pour autoriser les requêtes depuis l’application Expo (localhost, IP locale, mobile)
- Structure propre en modules : `UsersModule`, contrôleurs, services et DTO séparés

#### 5. Base de données et modèle utilisateur

- Utilisation de tableaux en mémoire (pour la version actuelle)
- Modèle utilisateur simple mais fonctionnel :
  ```
  {
    id: number;
    username: string;
    mdp: string;
  }
  ```
