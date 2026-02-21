# Gameplay

## Scope

Definieert de spelregels en het gedrag van de wereld en de poppetjes. Alleen wat de engine/simulatie moet garanderen; geen UI- of render-details.

## Wereld

- **2D-wereld** met **meerdere platformen** waarop poppetjes kunnen lopen.
- Platformen zijn de enige "grond"; beweging tussen platformen verloopt niet door lopen maar via **luchtballon** (zie Beweging).

## Beweging

- **Op een platform:** poppetjes lopen normaal (horizontaal op dat platform).
- **Tussen platformen:** alleen mogelijk met een **luchtballon**.
  - Van **hoger naar lager** platform: ze **dalen** en gebruiken een **parachute**.
  - Van lager naar hoger of gelijke hoogte: ballon zonder parachute.

## Start

- Er staat altijd **1 platform** klaar.
- Daarop staan **x poppetjes** klaar en **x bomen** (x is een spelparameter).
- Bij start doen de poppetjes nog niks en staan in **idle**-staat.

## Bouwwereld en huizen

- De speler plaatst een **huisje** in de bouwwereld.
- Na plaatsing is het huis in staat **"under construction"**.
- De engine onderhoudt een **timer** (voortgang) voor de bouw van dat huis; voor de speler zichtbaar.
- Als de timer vol is, is het gebouw af: het huisje is in zijn **volledige staat** zichtbaar.
- Daarna gaan de poppetjes gewoon verder met hun "leven".
- Als er niks te doen is, staan de poppetjes in **idle**-staat en wordt de idle-animatie afgespeeld.

## Autonoom werk van poppetjes

- Poppetjes gaan **zelf aan het werk** zodra er een huis in construction is.
- Ze **hakken hout bij de bomen** en **brengen het hout naar de construction site**.
- Gedrag: direct hout hakken en transport naar de bouwplaats; prioriteit/taakverdeling kan later verfijnd worden.

## Relatie tot andere specs

- Entity types (o.a. huis, npc) en wereldmodel blijven zoals in 01 en 02.
- Nieuwe concepten (platform, ballon, construction, boom, hout) worden in latere specs (components, entities, commands) uitgewerkt.
