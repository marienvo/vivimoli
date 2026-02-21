# Gameplay

## Scope

Definieert de spelregels en het gedrag van de wereld en de poppetjes. Alleen wat de engine/simulatie moet garanderen; geen UI- of render-details.

## Termen

- **Bos** en **bomen** zijn hetzelfde.

## Wereld

- **2D-wereld** met **meerdere platformen** waarop poppetjes kunnen lopen.
- Platformen zijn de enige "grond"; beweging tussen platformen kan alleen via **luchtballon** of **parachute** (zie Beweging en reistijd).
- Sommige platformen hebben veel **bos**, andere weinig, andere geen.
- Poppetjes hebben altijd een **ballon** en een **parachute** bij zich.

## Platform

- Per platform (zichtbaar): **X bos**, **houtvoorraad** (zie Houtvoorraad), en **huis in aanbouw of klaar**.
- Poppetjes op een platform met toegang tot bos (kappen) en tot het huis (bouwen) bouwen zo het huis.

## Houtvoorraad

- De **houtvoorraad** moet je in de game **aanwijzen**: een plek op het platform, net als een huis.
- De voorraad is op een gegeven moment **vol**.
- Als een houthakker zijn hout niet kwijt kan, blijft hij **wachten**; hij kan dan niet meer hakken tot er weer plek is om zijn handen te legen.

## Beweging en reistijd

- **Op een platform:** poppetjes lopen normaal (horizontaal op dat platform).
- **Tussen platformen:** alleen mogelijk met **luchtballon** of **parachute**; dat is de enige manier.
  - **Naar boven** of **horizontaal** naar ander platform: **luchtballon**.
  - **Naar beneden** (ook schuin): **parachute**.
- Met parachute of ballon neemt een poppetje **minder hout mee per keer** dan lopend op het platform.
- **Reistijd** hangt af van afstand en hoe snel een poppetje van A naar B kan bewegen.
- Uitrekenen van **dichtstbijzijnde** (bijv. bos, voorraad, bouwplaats) gebeurt in de engine; de **animatie** bepaalt uiteindelijk de echte snelheid en state/positie van een poppetje.
- Poppetjes bepalen zelf wat het snelst is: dichtbij kappen + lopend dragen = veel hout; ver weg = sneller kappen maar minder meenemen (parachute/ballon).

## Start

- Er staat altijd **1 platform** klaar.
- Daarop staan **x poppetjes** klaar en **x bos** (x is een spelparameter).
- Bij start doen de poppetjes nog niks en staan in **idle**-staat.

## Project (bouwen en slopen)

- De speler plaatst een **huisje** in de bouwwereld; technisch/code: een **"project"** (bouw).
- Na plaatsing is het huis in staat **"under construction"**.
- Een project krijgt **progress per afgeleverd hout**; voor de speler zichtbaar.
- De bouw duurt zolang het duurt, afhankelijk van hoe snel het hout naar de bouwplaats komt.
- Bouw duurt langer: op een platform **zonder poppetjes** (heel lang), **zonder bos of hout** (ook lang), of met **weinig poppetjes** (afhankelijk van hoeveel).
- Als de vereiste progress vol is, is het gebouw af: het huisje is in zijn **volledige staat** zichtbaar.
- **Slopen** is ook een project; het levert hout op.
- Daarna gaan de poppetjes gewoon verder met hun "leven".
- Als er niks te doen is, staan de poppetjes in **idle**-staat en wordt de idle-animatie afgespeeld.

## Beroepen

- **Houthakker:** hakt bos en laat de houtvoorraad groeien.
- **Bouwer:** bouwt huizen (levert hout aan bij project in aanbouw).
- **Tourist:** kan niks werkelijk, reist wat rond.

## Autonoom gedrag en werk

- Poppetjes zijn **autonoom**; ze krijgen geen instructies.
- Er is **werk** voor een poppetje als een project **under construction** bestaat op **zijn eigen platform**.
- Als hij **idle** is, wandelt hij rond als tourist.
- Als hij op een platform **komt** waar werk is (toevallig), gaat hij **helpen**.
- Poppetjes die lang geen werk hebben, **verspreiden** zich langzaam over de wereld. Ze staan vooral stil vaak.
- Houthakkers en bouwers bouwen het huis door te kappen en hout aan te leveren; ze bepalen zelf de afweging (dichtbij vs. ver, veel hout vs. parachute/ballon).

## Bos

- Een **bos kan opraken** als er veel wordt gekapt.
- Bos **groeit weer aan** als je het met rust laat.
- **Uitzondering:** waar gebouwd wordt, komt bos daar niet terug totdat je het gebouw **sloopt** (slopen is een project, levert hout op).

## Relatie tot andere specs

- Entity types (o.a. huis, npc) en wereldmodel blijven zoals in 01 en 02.
- Nieuwe concepten (platform, ballon, parachute, project, houtvoorraad, bos, beroep, slopen) worden in latere specs (components, entities, commands) uitgewerkt.
