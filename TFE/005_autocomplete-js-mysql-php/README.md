# Auto complete

<img src=".screenshots/Screenshot 2023-02-08 at 13.23.32.png" alt="resultat"><br>
<details>
<summary>quelques photos</summary>

<img src=".screenshots/Screenshot 2023-02-08 at 12.57.16.png" alt="défaut"><br>
<img src=".screenshots/Screenshot 2023-02-08 at 12.57.58.png" alt="erreur quand on a pas de résulats"><br>
<img src=".screenshots/Screenshot 2023-02-08 at 12.58.31.png" alt="liste des requêtes"><br>
<img src=".screenshots/Screenshot 2023-02-08 at 12.58.47.png" alt="preview de la réponse api"><br>
</details>
<br>
<br>

## Objectifs:

- Utiliser une connexion à une base de données pour filtrer des noms de villes en fonction d'une entrée utilisateur
- Mettre en œuvre une interface utilisateur dynamique en utilisant le `HTML`, `JavaScript` et [Tailwind CSS](https://tailwindcss.com/)


## Consignes:

1. Créez un fichier `getCities.php` séparé pour gérer la connexion à votre base de données et le filtre `SQL` pour les villes. Assurez-vous d'utiliser `PDO` pour la connexion.

1. Dans votre fichier HTML, ajoutez un champ `input` pour la saisie d'une ville et un `div` pour afficher les résultats. Assurez-vous d'utiliser les classes de [Tailwind CSS](https://tailwindcss.com/) pour une apparence esthétique.

1. Utilisez le `JavaScript` pour implémenter une fonction de recherche de ville qui s'exécute à chaque fois que l'utilisateur modifie le contenu du champ `input`. Utilisez [fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch) pour envoyer une requête à votre fichier `getCities.php` et récupérer les résultats.

1. Dynamisez l'interface utilisateur en affichant les noms de villes correspondants dans le `div` de résultats. Si aucune ville ne correspond, affichez un message indiquant à l'utilisateur de saisir une orthographe différente.

1. Ajoutez une fonctionnalité pour vider le champ `input` lorsque l'utilisateur appuie sur la touche `Escape`.


## Conclusion:

la structure de vos fichiers devrait ressembler a ça 
```bash
index.html
getCities.php
js/
   |script.js
```

&#9888; vu que votre projet contien un fichier `php` pensez a démarrer celui ci via une application tiers comme [MAMP](https://www.mamp.info/en/downloads/), [XAMPP](https://www.apachefriends.org/fr/index.html) ou si le coeur vous en dit utiliser la ligne de commande
```bash
php -S localhost:9999
```
sur votre `index.html`

<br>
Notez que vous devrez peut-être adapter le code en fonction de la structure de votre base de données et des exigences spécifiques de l'exercice. Bonne chance !

