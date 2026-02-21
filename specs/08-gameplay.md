# Gameplay

## Scope

Definieert de spelregels en het gedrag van de wereld en de poppetjes. Alleen wat de engine/simulatie moet garanderen; geen UI- of render-details.

## Wereld

- **2D-wereld** met **meerdere platformen** waarop poppetjes kunnen lopen.
- Platformen zijn de enige "grond"; beweging tussen platformen kan alleen via **luchtballon** of **parachute** (zie Beweging).
- Sommige platformen hebben veel **bos**, andere weinig, andere geen.

## Platform

- Per platform (zichtbaar): **X bos**, **X hout** (bijv. stapel), en **huis in aanbouw of klaar**.
- Poppetjes op een platform met toegang tot hout (taak: kappen) en toegang tot huis (taak: bouwen) bouwen zo het huis.

## Beweging

- **Op een platform:** poppetjes lopen normaal (horizontaal op dat platform).
- **Tussen platformen:** alleen mogelijk met **luchtballon** of **parachute**; dat is de enige manier.
  - **Naar boven** of **horizontaal** naar ander platform: **luchtballon**.
  - **Naar beneden** (ook schuin): **parachute**.
- Met parachute of ballon neemt een poppetje **minder hout mee per keer** dan lopend op het platform.
- Poppetjes bepalen zelf wat het snelst is: hout kappen in de buurt en lopend meenemen = veel hout kunnen dragen; hout kappen ver weg = sneller kappen maar minder meenemen (parachute/ballon).

## Start

- Er staat altijd **1 platform** klaar.
- Daarop staan **x poppetjes** klaar en **x bomen** (x is een spelparameter).
- Bij start doen de poppetjes nog niks en staan in **idle**-staat.

## Bouwwereld en huizen (project)

- De speler plaatst een **huisje** in de bouwwereld; technisch/code: een **"project"**.
- Na plaatsing is het huis in staat **"under construction"**.
- Het project **beïnvloedt** wat de poppetjes doen; poppetjes krijgen **geen instructies**, ze zijn **autonoom**.
- De engine onderhoudt een **punten-/voortgangssysteem** voor de bouw; voor de speler zichtbaar (percentage).
- De bouw duurt zolang het duurt, afhankelijk van hoe snel het hout naar de bouwplaats komt.
- Bouw duurt langer: op een platform **zonder poppetjes** (heel lang), **zonder bos of hout** (ook lang), of met **weinig poppetjes** (afhankelijk van hoeveel).
- Als de vereiste punten/voortgang vol is, is het gebouw af: het huisje is in zijn **volledige staat** zichtbaar.
- Daarna gaan de poppetjes gewoon verder met hun "leven".
- Als er niks te doen is, staan de poppetjes in **idle**-staat en wordt de idle-animatie afgespeeld.

## Autonoom gedrag van poppetjes

- Poppetjes zijn **autonoom**; ze krijgen geen instructies.
- Poppetjes op een platform met toegang tot hout (kappen) en tot het huis (bouwen) bouwen het huis door te kappen en hout aan te leveren.
- Ze bepalen zelf de afweging: dichtbij kappen + lopend dragen = veel hout per keer; ver weg kappen = sneller kappen maar minder hout per keer (parachute/ballon).

## Relatie tot andere specs

- Entity types (o.a. huis, npc) en wereldmodel blijven zoals in 01 en 02.
- Nieuwe concepten (platform, ballon, construction, boom, hout) worden in latere specs (components, entities, commands) uitgewerkt.
