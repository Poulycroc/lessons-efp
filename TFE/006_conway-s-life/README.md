# Créez votre propre Jeu de la Vie en JavaScript !

<img src=".screenshots/Screenshot 2023-02-22 at 11.27.47.png" alt="finished game" />

## C'est quoi ?

Pour commencer, qu'est-ce que le `"Jeu de la vie"` ? C'est un jeu de simulation mathématique qui utilise une grille bidimensionnelle pour représenter des cellules vivantes et mortes. Les cellules évoluent selon des règles simples, en fonction de l'état des cellules voisines, et forment des motifs intéressants et parfois même complexes.

<details>
<summary>En quoi c'est utile pour ma formation ?</summary>

Le Jeu de la Vie est un excellent projet pour comprendre certains concepts clés de JavaScript, qui peuvent être utiles dans la suite de votre formation en `NodeJS` et `ReactJS`. Voici quelques raisons pour lesquelles cet exercice est utile :

1. **Manipulation de tableaux** : Pour stocker l'état de chaque cellule dans le Jeu de la Vie, nous utilisons une matrice à deux dimensions. Cela vous aidera à comprendre comment manipuler des tableaux en JavaScript, une compétence clé que vous utiliserez dans la plupart des projets JavaScript.

1. **Fonctions** : Le Jeu de la Vie implique de nombreuses fonctions pour initialiser la grille, mettre à jour les cellules et exécuter le jeu. Cela vous aidera à comprendre comment écrire des fonctions en JavaScript et à les utiliser pour organiser votre code de manière efficace.

1. **Programmation orientée objet** : Vous pouvez également implémenter le Jeu de la Vie en utilisant la programmation orientée objet (`POO`). Cela peut vous aider à comprendre les concepts de la `POO` en JavaScript, qui est largement utilisée dans `ReactJS`.

1. **Gestion de l'état** : Le Jeu de la Vie montre comment mettre à jour l'état d'un élément en fonction de son état précédent et de l'état de ses voisins. Cela peut vous aider à comprendre comment gérer l'état dans les applications `NodeJS` et `ReactJS`, où la gestion de l'état est une compétence clé.

En bref, le Jeu de la Vie est un excellent projet pour comprendre les concepts clés de JavaScript, qui seront utiles dans la suite de votre formation. Cela vous aidera à devenir un meilleur développeur et à comprendre comment créer des applications JavaScript plus complexes.

</details><br>

## Objectif

Dans ce projet, nous créer le Jeu de la Vie de Conway en utilisant JavaScript. Nous allons créer une grille de cellules et les faire évoluer selon des règles simples et peut-être être imporessioner par ce que l'on verra.

## Résultat attendu

À la fin de ce projet, vous aurez créé une simulation de Jeu de la Vie complète qui sera affichée dans une grille de cellules en `HTML` et `CSS`. Vous pourrez voir les cellules évoluer en fonction des règles du jeu, formant ainsi des motifs intéressants et parfois même complexes. Vous aurez également appris des concepts clés de JavaScript tels que la création de fonctions, la manipulation de tableaux et l'utilisation de setInterval pour rafraîchir l'écran.

## Pour atteindre cet objectif, nous allons suivre les étapes suivantes

<ol>
  <li>Créer une grille de cellules en JavaScript</li>
  <ul>
    <li>Stocker l'état de chaque cellule dans une matrice à deux dimensions</li>
    <li>Ajouter les cellules à la grille en utilisant des div pour chaque cellule</li>
    <li>Positionner les cellules en utilisant les propriétés de la grille CSS</li>
    </ul>
</li> 
<li>
  Initialiser la grille avec des cellules aléatoires
  <ul>
    <li>Utiliser la fonction Math.random() pour décider si chaque cellule est vivante ou morte</li>
  </ul>
  </li>
<li>
  Définir les règles du jeu
  <ul>
    <li>Écrire une fonction pour mettre à jour l'état de chaque cellule en fonction de ses voisines</li>
    <li>Utiliser une matrice temporaire pour stocker les changements et mettre à jour la grille en une seule étape</li>
  </ul>
  </li>

  <li>Exécuter le jeu
  <ul>
    <li>Utiliser la fonction setInterval pour rafraîchir l'écran à chaque itération</li>
    <li>Appeler la fonction de mise à jour de la grille à chaque rafraîchissement</li>
  </ul>
  </li>
</ol>

En suivant ces étapes, vous serez en mesure de reproduire le Jeu de la Vie de Conway en JavaScript. N'hésitez pas à poser des questions et à demander de l'aide si vous en avez besoin. Amusez-vous bien !
