# Le Jeu du titre

[`www.lejeudutitre.com`](www.lejeudutitre.com) a pour but de rassembler les meilleurs proposition au « Jeu de la sextape » initié par la série _Brooklyn Nine-Nine_.  C’est une blague équivalente au « That’s what she said » (« C’est ce qu’elle m’a dit hier soir ») de Michael Scott (Steve Carell) dans la version américaine de The Office.

## Installation

C'est un site web static réalisé avec with Hugo (www.gohugo.io)

- Install Hugo
- Download sources
- Run Hugo

### Installer chez soi

Pour voir le site en action chez soi, faire fonctionner le serveur local intégré d'Hugo.
```
$ hugo server
```
Ensuite saisir [`localhost:1313`](http://localhost:1313) son navigateur préféré

## Proposer un titre

C'est très simple, il suffit de créer un fichier dans le repertoire **content/titre** en respectant le format markdown
```
+++
date = "AAAA-MM-DDT20:20:20+00:00"
title = "Un titre (court de préférence)"
icon = "une icone de fontawesome (que vous trouverez ici https://fontawesome.com/icons?d=gallery)"
+++

_Les didascalies en italique_
* _(Un personnage)_ : Un dialogue bien senti
* _(Un autre personnage)_ : **Le titre en gras!**
```

Nous attendons vos propositions pour alimenter le site !

### CI & deploy 
[![CircleCI](https://circleci.com/gh/lechaps/lejeudutitre.svg?style=svg)](https://circleci.com/gh/lechaps/lejeudutitre)

Powered by **https://circleci.com**

## Thanks

Thanks to [Steve Francia](https://github.com/spf13) for creating Hugo and the awesome community around the project.

## Sponsors

mmm, i don't have sponsors. But do i need them?

[lechaps](https://github.com/lechaps)

## Contributeur

@artheriom
