# Algorithme sonore de l'application

## Couches sonores

La composition sonore de l'application est constituée de 3 couches :

- Une musique, qui est jouée en continu durant l'expérience
- Une deuxième couche de sons influencée par divers paramètres :
    - Des sons d'ambiance qui correspondent à l'environnement de l'utilisateur (en ville cela peut être des klaxons)
    - Des sons ponctuels qui varient en fonction du moment de la journée (par exemple des oiseaux le matin)
    - Des sons "d'accélération" qui s'accélèrent lorsque l'utilisateur est en phase d'accélération

## Algorithme

### Sons d'ambiance

En même temps que le démarrage de la musique, et en fonction du type d'environnement (ville, campagne), on joue un son d'ambiance aléatoire.
**Attention** : la plage n'est pas prise en compte.

Tout comme la musique, le son d'ambiance doit être déchargé si l'utilisateur revient au menu

### Sons ponctuels

Les sons ponctuels doivent se déclencher sur certains mots seulement. Ainsi, à chaque fois que le vers actuel change, on
scanne ce vers pour voir s'il contient un mot qui doit déclencher un son ponctuel. Dans ce cas, on joue le son ponctuel.

### Sons d'accélération

À chaque fois que la valeur `speedIncreased` est changée, un intervalle est défini (plus ou moins long en fonction de
s'il y a accélération ou non) et joue un son aléatoirement à chaque fois

Un `sleep()` aléatoire est ajouté à chaque itération pour donner une impression d'aléatoire.
