### Détails techniques des interfaces développées

Dans le cadre de ce projet, j'ai développé une application mobile complète avec **React Native** et **Tailwind CSS** (via `tailwind-react-native-classnames`) pour une interface moderne, fluide et responsive.

Voici les différentes interfaces implémentées :

#### 1. Interface S'inscrire (Inscription)

Cette page permet à un nouvel utilisateur de créer un compte dans l'application.  
Fonctionnalités :

- Champs : Nom d'utilisateur, Mot de passe, Confirmation du mot de passe
- Validation en temps réel des champs
- Envoi des données vers l'API `/users/register` (POST)
- Message de succès ou d’erreur clair (ex: "Utilisateur déjà existant")
- Redirection automatique vers la page de connexion après inscription réussie
- Design épuré avec fond dégradé et boutons stylisés

#### 2. Interface Mot de passe oublié (forget_pass / Changer le mot de passe)

Cette interface permet à l'utilisateur de réinitialiser son mot de passe s'il l’a oublié.  
Fonctionnalités :

- Saisie du nom d’utilisateur
- Saisie du nouveau mot de passe + confirmation
- Vérification que les deux mots de passe correspondent
- Appel API vers `/users/reset-password` ou `/users/update-password`
- Affichage du message d’erreur précis du backend (ex: "Utilisateur non trouvé")
- Aucun header visible (headerShown: false) pour un design plein écran comme dans les vraies apps (Instagram, TikTok, etc.)

#### 3. Interface Se connecter (Login)

Page d’authentification principale de l’application.  
Fonctionnalités :

- Champs : Nom d’utilisateur et Mot de passe
- Bouton "Se connecter" + lien vers "Mot de passe oublié ?"
- Envoi des données à l’API `/users/login`
- Gestion fine des erreurs : affichage du **message exact du backend** (ex: "Nom d'utilisateur incorrect" ou "Mot de passe incorrect")
- Stockage sécurisé des données utilisateur dans `AsyncStorage` après connexion réussie
- Redirection vers la page d’accueil protégée (`/home`)

#### 4. Interface Utilisateur (Accueil / Home après connexion)

Page principale accessible uniquement aux utilisateurs connectés.  
Fonctionnalités :

- Affichage du nom d’utilisateur et de l’ID
- Avatar stylisé avec initiale + indicateur en ligne (point vert)
- Système de **tabs personnalisés** avec animation fluide :
  - Profil → informations personnelles
  - Paramètres → options de l’application
  - Activité → historique des actions
- Boutons "Modifier le profil" et "Se déconnecter" avec confirmation
- Protection de la route : si non connecté → redirection automatique vers la page de login
- Design moderne avec glassmorphism, dégradés et animations subtiles

.
