# useContext

[source](https://www.youtube.com/watch?v=V13h-VKpB7Y&t=746s)

## C'est quoi ?

useContext est un Hook de React qui permet à un composant de consommer un contexte créé par un composant parent.
Un contexte est un objet JavaScript qui stocke des données que plusieurs composants peuvent accéder et utiliser.

Pour utiliser useContext, vous devez d'abord créer un contexte avec la méthode createContext() de React.
Ensuite, vous pouvez utiliser le Hook useContext dans n'importe quel composant enfant pour accéder aux valeurs stockées dans le contexte.

## Pourquoi ?

Le désavantage du "props drilling" est que cela peut rendre le code plus difficile à maintenir et à comprendre. Si un composant doit transmettre des props à de nombreux composants enfants, cela peut devenir fastidieux et augmenter considérablement la quantité de code nécessaire. De plus, si une modification est apportée à la structure des composants, il peut être nécessaire de modifier de nombreux endroits où les props sont transmises en cascade.

```jsx
import React from "react";

// Le composant qui reçoit les props
function ChildComponent(props) {
  return (
    <div>
      <p>Nom: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

function ParentComponent() {
  const values = { name: "Jean", age: 30 };

  return (
    <>
      <ChildComponent name={values.name} age={values.age} />
    </>
  );
}
```

Bien que cela fonctionne bien pour de petits projets, cela peut devenir fastidieux lorsque vous devez transmettre des props à plusieurs niveaux de composants enfants. C'est pourquoi l'utilisation de useContext peut simplifier grandement le code et le rendre plus facile à lire et à comprendre.

<img src=".screenshots/Screenshot 2023-03-17 at 15.17.39.png" alt="Props drilling" />

## Premier use context

<img src=".screenshots/Screenshot 2023-03-17 at 15.33.44.png" alt="useContext" />

L'image schématique montre comment le Hook useContext permet à un composant de consommer un contexte créé par un composant parent, en accédant directement aux valeurs stockées dans le contexte sans avoir à transmettre des props en cascade à travers les composants intermédiaires.

```jsx
import React, { createContext, useContext } from "react";

// Créer un contexte avec createContext()
const MonContexte = createContext({ name: "", age: 0 });

function ParentComponent() {
  // Stocker des valeurs dans le contexte
  const values = { name: "Marie", age: 25 };

  return (
    // Fournir le contexte à tous les composants enfants avec le Provider
    <MonContexte.Provider value={values}>
      <ChildComponent />
    </MonContexte.Provider>
  );
}

function ChildComponent() {
  // Utiliser useContext pour accéder aux valeurs stockées dans le contexte
  const { name, age } = useContext(MonContexte);

  return (
    <div>
      <p>Nom: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

### Petite explication

<img src=".screenshots/Screenshot 2023-03-17 at 15.44.32.png" alt="context explication" />

## A quel moment utiliser un useContext ?

1. a partir du moment ou tu passes des props à plus de 2 enfants qui ne les utilisent pas
2. pour faire des composants qui comuniquent entre eux
3. pour des données global, "AuthProvider", "LocaleProvider"
4. garder ta logique a un endroit, éviter d'avoir de la logique partout, en l'utilisant uniquelent des ton provider, ça va la centraliser et permettre une plus grosse intéraction
