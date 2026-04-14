# Correction — DNB Blanc n°2 — Mathématiques
## Collège Gaston Chaissac — Pouzauges — Jeudi 9 avril 2026

> **Remarque** : l'ordre des exercices dans le sujet est : 1) Automatismes, 2) Circuits, 3) Programme de calcul, 4) Jardin botanique, 5) Fonctions, 6) Lunettes de soleil.
> Les barèmes par question rappelés ci-dessous suivent le barème de correction fourni (`bareme_dnb_blanc_2.json`, 20 points au total).

---

## Exercice 1 — Automatismes (6 pts)

### Question 1 (1 pt) — Schéma à main levée

**Énoncé** : ABCD est un carré et CDE est un triangle équilatéral (E est à l'intérieur du carré ABCD). BCF est un triangle isocèle en F (F est à l'extérieur du carré ABCD). Représenter cette configuration par un schéma à main levée et ajouter les codages nécessaires.

**Correction** : On trace un carré ABCD (on code les 4 côtés avec le même petit trait pour indiquer qu'ils sont de même longueur, et on marque les 4 angles droits).

- Le triangle **CDE** est équilatéral : E est à l'intérieur du carré. On code les trois côtés [CD], [DE] et [EC] avec un même signe (par exemple un double trait) pour indiquer qu'ils ont la même longueur.
- Le triangle **BCF** est isocèle en F : F est à l'extérieur du carré. On code les deux côtés [FB] et [FC] avec un même signe (par exemple un triple trait) pour indiquer qu'ils ont la même longueur.

**Réponse** : schéma avec codages des 4 côtés du carré (égaux), des angles droits, des 3 côtés du triangle équilatéral CDE, et des deux côtés égaux [FB] et [FC] du triangle isocèle BCF.

---

### Question 2 (1 pt) — Périmètre d'un cercle de rayon 3 cm

**Énoncé** : Calculer le périmètre d'un cercle de rayon 3 cm.

**Correction** : Le périmètre d'un cercle de rayon $r$ est $P = 2\pi r$.

$$P = 2 \times \pi \times 3 = 6\pi \approx 18{,}85 \text{ cm}$$

**Réponse** : $\boxed{P = 6\pi \text{ cm} \approx 18{,}85 \text{ cm}}$

---

### Question 3 (1 pt) — Calculer 77,6 ÷ 10

**Énoncé** : Calculer $77{,}6 \div 10$.

**Correction** : Diviser par 10 revient à décaler la virgule d'un rang vers la gauche.

**Réponse** : $\boxed{77{,}6 \div 10 = 7{,}76}$

---

### Question 4 (1 pt) — Total des ventes

**Énoncé** : D'après le diagramme en barres, quel est le total des ventes sur la semaine ?

**Correction** : On lit sur le diagramme :
- Lundi : 33
- Mardi : 49
- Mercredi : 48
- Jeudi : 30
- Vendredi : 32

$$33 + 49 + 48 + 30 + 32 = 192$$

**Réponse** : $\boxed{\text{Total des ventes} = 192}$

---

### Question 5 (1 pt) — Densité de population

**Énoncé** : Une ville compte 49 298 habitants pour une superficie de 302 km². Quelle est sa densité de population ?

**Correction** : La densité de population est le nombre d'habitants par km² :

$$d = \dfrac{49\,298}{302} \approx 163{,}24 \text{ hab/km}^2$$

**Réponse** : $\boxed{d \approx 163 \text{ hab/km}^2}$

---

### Question 6 (1 pt) — Script Scratch

**Énoncé** : Écrire un script Scratch qui dessine un polygone régulier à 5 côtés de 147 pixels de côté.

**Correction** : Un polygone régulier à 5 côtés (pentagone régulier) nécessite de tourner de $\dfrac{360°}{5} = 72°$ à chaque sommet.

**Script** :

```
Quand (drapeau vert) est cliqué
Répéter 5 fois
    Avancer de 147
    Tourner de 72 degrés
Fin
```

**Réponse** : boucle « répéter 5 fois » avec « avancer de 147 » puis « tourner de 72 degrés ».

---

## Exercice 2 — Circuits d'entraînement (PGCD/PPCM) (2 pts)

### Question 1 (0,5 pt) — Durées des circuits

**Énoncé** : Montrer que le circuit 1 s'effectue en 280 s et le circuit 2 en 350 s.

**Correction** :

**Circuit 1** : 5 exercices × 40 s + 5 repos × 16 s (on ajoute 5 repos car le circuit revient au départ : chaque exercice est suivi d'un repos pour aller au suivant, et après le dernier exercice un repos permet de revenir à l'exercice 1).

$$5 \times 40 + 5 \times 16 = 200 + 80 = 280 \text{ s}$$

**Circuit 2** : 10 exercices × 30 s + 10 repos × 5 s.

$$10 \times 30 + 10 \times 5 = 300 + 50 = 350 \text{ s}$$

**Réponse** : $\boxed{\text{Circuit 1} = 280 \text{ s} \; ; \; \text{Circuit 2} = 350 \text{ s}}$

---

### Question 2 (0,5 pt) — Décomposition en facteurs premiers

**Énoncé** : Décomposer 280 et 350 en produit de facteurs premiers.

**Correction** :

- $280 = 2 \times 140 = 2 \times 2 \times 70 = 2 \times 2 \times 2 \times 35 = 2 \times 2 \times 2 \times 5 \times 7$
- $350 = 2 \times 175 = 2 \times 5 \times 35 = 2 \times 5 \times 5 \times 7$

**Réponse** :

$$\boxed{280 = 2^3 \times 5 \times 7 \qquad 350 = 2 \times 5^2 \times 7}$$

---

### Question 3a (0,5 pt) — Position à 2 800 s

**Énoncé** : Expliquer pourquoi, à 2 800 s, Camille est de nouveau au départ du circuit 1. Où se trouve Dominique à cet instant ?

**Correction** :

**Camille** : un tour dure 280 s. Or $2\,800 = 280 \times 10$, donc à 2 800 s Camille termine exactement son 10ᵉ tour du circuit 1 : elle est donc de retour au départ.

**Dominique** : un tour du circuit 2 dure 350 s.

$$2\,800 \div 350 = 8$$

Donc à 2 800 s, Dominique termine exactement son 8ᵉ tour du circuit 2. Comme $2\,800$ est un multiple de 350, Dominique est également **au départ du circuit 2**.

**Réponse** : $\boxed{\text{Camille et Dominique sont tous les deux au départ de leur circuit à } t = 2\,800 \text{ s}}$

---

### Question 3b (0,5 pt) — Première rencontre au départ (PPCM)

**Énoncé** : Combien de temps faut-il pour que Camille et Dominique se retrouvent en même temps au départ de leur circuit pour la première fois ? Exprimer en minute et seconde.

**Correction** : On cherche le **PPCM** de 280 et 350.

En utilisant les décompositions :
- $280 = 2^3 \times 5 \times 7$
- $350 = 2 \times 5^2 \times 7$

$$\text{PPCM}(280 ; 350) = 2^3 \times 5^2 \times 7 = 8 \times 25 \times 7 = 1\,400 \text{ s}$$

**Conversion** : $1\,400 \div 60 = 23$ minutes, reste $1\,400 - 23 \times 60 = 1\,400 - 1\,380 = 20$ s.

**Réponse** : $\boxed{1\,400 \text{ s} = 23 \text{ min } 20 \text{ s}}$

---

## Exercice 3 — Programme de calcul (3 pts)

Programme : choisir un nombre → le mettre au carré → soustraire le triple du nombre de départ → soustraire 4.

### Question 1 (0,5 pt) — Test avec x = 5

**Correction** :

$$5^2 - 3 \times 5 - 4 = 25 - 15 - 4 = 6$$

**Réponse** : $\boxed{\text{Le résultat est bien 6}}$

---

### Question 2 (0,5 pt) — Expression en fonction de x

**Correction** : Avec un nombre de départ $x$, le programme donne :

$$x^2 - 3x - 4$$

**Réponse** : $\boxed{x^2 - 3x - 4}$

---

### Question 3 (0,5 pt) — Vérifier la forme factorisée

**Énoncé** : Vérifier que $x^2 - 3x - 4 = (x+1)(x-4)$.

**Correction** : On développe $(x+1)(x-4)$ :

$$(x+1)(x-4) = x \times x + x \times (-4) + 1 \times x + 1 \times (-4)$$
$$= x^2 - 4x + x - 4 = x^2 - 3x - 4$$

**Réponse** : $\boxed{(x+1)(x-4) = x^2 - 3x - 4}$ ✓

---

### Question 4 (0,5 pt) — Résultat nul

**Énoncé** : Pour quels nombres de départ le résultat du programme vaut-il 0 ?

**Correction** : On résout $(x+1)(x-4) = 0$. Un produit de facteurs est nul si et seulement si l'un des facteurs est nul :

- $x + 1 = 0 \iff x = -1$
- $x - 4 = 0 \iff x = 4$

**Réponse** : $\boxed{x = -1 \text{ ou } x = 4}$

---

### Question 5 (1 pt) — Compléter le script Scratch

**Correction** : Le programme calcule $x^2 - 3x - 4$.

- Ligne 4 : **mettre y à x × x** (le carré de $x$).
- Ligne 6 : **mettre Résultat à y − z − 4** (où $z = 3x$).

**Réponse** :

- **Ligne 4** : `mettre y à (x * x)`
- **Ligne 6** : `mettre Résultat à (y - z - 4)`

---

## Exercice 4 — Jardin botanique (3 pts)

Données : ABCD quadrilatère ; AB = 500 m, BE = 250 m, DE = 750 m ; [AC] et [BD] se coupent en E ; angles droits marqués en A (angle DAB), en D (angle ADC) et en E (angle AEB ou similaire — diagonales perpendiculaires).

D'après la figure : ABD est rectangle en A ; (AC) ⊥ (BD) en E.

### Question 1 (0,5 pt) — Longueur [DB]

**Correction** : E appartient à [BD], donc $DB = BE + ED$.

$$DB = 250 + 750 = 1\,000 \text{ m}$$

**Réponse** : $\boxed{DB = 1\,000 \text{ m}}$

---

### Question 2 (0,5 pt) — Longueur [AD] (Pythagore dans ABD)

**Correction** : Le triangle ABD est rectangle en A (angle droit codé en A). D'après le **théorème de Pythagore** :

$$BD^2 = AB^2 + AD^2$$
$$1\,000^2 = 500^2 + AD^2$$
$$1\,000\,000 = 250\,000 + AD^2$$
$$AD^2 = 750\,000$$
$$AD = \sqrt{750\,000} \approx 866{,}025 \text{ m}$$

**Réponse** : $\boxed{AD \approx 866 \text{ m}}$

---

### Question 3a (partie 0,5 pt) — Sinus de l'angle EAB

**Correction** : Dans le triangle ABE, l'angle en E est droit (les diagonales se coupent perpendiculairement en E). Le triangle ABE est donc rectangle en E.

L'angle $\widehat{\text{EAB}}$ est dans ce triangle rectangle. Pour l'angle $\widehat{\text{EAB}}$ :
- côté opposé : [BE] (face à l'angle en A)
- hypoténuse : [AB] (face à l'angle droit en E)

$$\sin(\widehat{\text{EAB}}) = \dfrac{BE}{AB} = \dfrac{250}{500} = \dfrac{1}{2} = 0{,}5$$

**Réponse** : $\boxed{\sin(\widehat{\text{EAB}}) = 0{,}5}$

---

### Question 3b (inclus dans 0,5 pt) — Mesure de l'angle

**Correction** : On cherche $\widehat{\text{EAB}}$ tel que $\sin(\widehat{\text{EAB}}) = 0{,}5$.

À la calculatrice : $\widehat{\text{EAB}} = \arcsin(0{,}5) = 30°$.

**Réponse** : $\boxed{\widehat{\text{EAB}} = 30°}$

---

### Question 4a (0,5 pt) — (AB) ∥ (DC)

**Correction** : On sait que :
- (AB) ⊥ (AD) (ABD est rectangle en A) ;
- (DC) ⊥ (AD) (angle droit codé en D dans le quadrilatère : l'angle $\widehat{\text{ADC}}$ est droit).

Deux droites perpendiculaires à une même troisième droite sont parallèles entre elles.

**Réponse** : $\boxed{(AB) \parallel (DC)}$

---

### Question 4b (0,5 pt) — CD = 1 500 m (Thalès)

**Correction** : Les droites (AC) et (BD) se coupent en E. D'après la question 4a, les droites (AB) et (CD) sont parallèles. On peut donc appliquer le **théorème de Thalès** dans cette configuration (triangles EAB et ECD en « papillon » avec E sommet commun) :

$$\dfrac{EA}{EC} = \dfrac{EB}{ED} = \dfrac{AB}{CD}$$

On utilise le rapport connu :

$$\dfrac{EB}{ED} = \dfrac{250}{750} = \dfrac{1}{3}$$

Donc :

$$\dfrac{AB}{CD} = \dfrac{1}{3} \iff CD = 3 \times AB = 3 \times 500 = 1\,500 \text{ m}$$

**Réponse** : $\boxed{CD = 1\,500 \text{ m}}$

---

### Question 5 (0,5 pt) — Temps du tour du jardin

**Correction** : On calcule le périmètre du quadrilatère ABCD :

$$P = AB + BC + CD + DA$$
$$P = 500 + 1\,323 + 1\,500 + 866 = 4\,189 \text{ m}$$

Le piéton marche à 1,1 m/s. Le temps $t$ est :

$$t = \dfrac{4\,189}{1{,}1} \approx 3\,808{,}2 \text{ s}$$

Or 1 heure = 3 600 s. Donc $t \approx 3\,808 \text{ s} > 3\,600 \text{ s}$.

**Réponse** : $\boxed{\text{Non, le temps (≈ 3 808 s ≈ 1 h 3 min) est supérieur à 1 heure.}}$

---

## Exercice 5 — Fonctions (4 pts)

Programme A (schéma arborescent) : choisir un nombre → d'un côté « Ajouter 3 » ; de l'autre côté « Soustraire 4 » → multiplier les deux résultats.

Résultat admis : $f(x) = (x+3)(x-4)$.

### Question 1a (0,5 pt) — Test avec x = −8

**Correction** :

- $-8 + 3 = -5$
- $-8 - 4 = -12$
- Produit : $(-5) \times (-12) = 60$

**Réponse** : $\boxed{\text{Le résultat est bien 60}}$

---

### Question 1b (0,5 pt) — Résoudre (x+3)(x−4) = 0

**Correction** : Un produit est nul si et seulement si l'un de ses facteurs est nul :

- $x + 3 = 0 \iff x = -3$
- $x - 4 = 0 \iff x = 4$

**Réponse** : $\boxed{x = -3 \text{ ou } x = 4 \text{ donnent un résultat nul.}}$

---

### Question 2a (0,5 pt) — Forme développée

**Correction** : On développe $(x+3)(x-4)$ :

$$(x+3)(x-4) = x^2 - 4x + 3x - 12 = x^2 - x - 12$$

**Réponse** : $\boxed{f(x) = x^2 - x - 12}$

---

### Question 2b (0,5 pt) — Calcul de f(1/2)

**Correction** :

$$f\!\left(\dfrac{1}{2}\right) = \left(\dfrac{1}{2}\right)^2 - \dfrac{1}{2} - 12 = \dfrac{1}{4} - \dfrac{1}{2} - 12$$

Avec un dénominateur commun 4 :

$$f\!\left(\dfrac{1}{2}\right) = \dfrac{1}{4} - \dfrac{2}{4} - \dfrac{48}{4} = \dfrac{1 - 2 - 48}{4} = -\dfrac{49}{4} = -12{,}25$$

**Réponse** : $\boxed{f\!\left(\tfrac{1}{2}\right) = -\tfrac{49}{4} = -12{,}25}$

---

### Question 2c (0,5 pt) — Antécédents de −6 (graphiquement)

**Correction** : On cherche les valeurs de $x$ telles que $f(x) = -6$. On trace la droite horizontale d'équation $y = -6$ et on lit les abscisses des points d'intersection avec $\mathcal{C}_f$.

**Vérification algébrique** (non demandée mais utile) :
$$x^2 - x - 12 = -6 \iff x^2 - x - 6 = 0 \iff (x+2)(x-3) = 0$$

d'où $x = -2$ ou $x = 3$. Graphiquement on lit bien deux antécédents : environ $-2$ et $3$.

**Réponse** : $\boxed{\text{Les antécédents de } -6 \text{ sont } x = -2 \text{ et } x = 3.}$

---

### Question 3a (0,5 pt) — Formule tableur en B2

**Correction** : La fonction $g$ est définie par $g(x) = 3x - 7$. En B2, on calcule $g$ appliqué à la valeur de A2.

**Réponse** : $\boxed{\texttt{=3*A2-7}}$

---

### Question 3b (0,5 pt) — Tracé de g

**Correction** : $g$ est une fonction affine ; sa représentation graphique est une droite. On place deux points du tableau, par exemple :

- $(0 ; -7)$ (ordonnée à l'origine)
- $(4 ; 5)$

Puis on trace la droite passant par ces deux points.

**Réponse** : droite passant par $(0 ; -7)$ et $(4 ; 5)$ (coefficient directeur 3).

---

### Question 3c (0,5 pt) — Intersection f et g (graphique)

**Correction** : On cherche les $x$ tels que $f(x) = g(x)$. Graphiquement, ce sont les abscisses des points d'intersection de $\mathcal{C}_f$ (parabole bleue) et de la droite tracée pour $g$.

**Vérification algébrique** (non demandée) :
$$x^2 - x - 12 = 3x - 7 \iff x^2 - 4x - 5 = 0 \iff (x+1)(x-5) = 0$$

d'où $x = -1$ ou $x = 5$. On lit graphiquement les deux points d'intersection d'abscisses $-1$ et $5$.

**Réponse** : $\boxed{\text{Les nombres qui ont la même image par } f \text{ et } g \text{ sont } x = -1 \text{ et } x = 5.}$

---

## Exercice 6 — Lunettes de soleil (tableur/stats) (2 pts)

Données : prix à l'unité des 5 modèles : 75 € ; 100 € ; 110 € ; 140 € ; 160 €.
Nombres de paires vendues : 1 200 ; 950 ; 875 ; 250 ; 300.

### Question 1 (0,5 pt) — Étendue des prix

**Correction** : L'étendue = plus grande valeur − plus petite valeur.

- Prix maximum : 160 €
- Prix minimum : 75 €

$$\text{Étendue} = 160 - 75 = 85 \text{ €}$$

**Réponse** : $\boxed{\text{Étendue} = 85 \text{ €}}$

---

### Question 2a (partie 0,5 pt) — Formule en G2

**Correction** : En G2, on veut la somme des paires vendues (plage B2:F2).

**Réponse** : $\boxed{\texttt{=SOMME(B2:F2)}}$

---

### Question 2b (inclus dans 0,5 pt) — Nombre total de paires vendues

**Correction** :

$$1\,200 + 950 + 875 + 250 + 300 = 3\,575 \text{ paires}$$

**Réponse** : $\boxed{\text{Total} = 3\,575 \text{ paires}}$

---

### Question 3a (partie 0,5 pt) — Montant total des ventes

**Correction** : Pour chaque modèle, on multiplie le prix par la quantité vendue, puis on additionne :

- Modèle 1 : $1\,200 \times 75 = 90\,000$ €
- Modèle 2 : $950 \times 100 = 95\,000$ €
- Modèle 3 : $875 \times 110 = 96\,250$ €
- Modèle 4 : $250 \times 140 = 35\,000$ €
- Modèle 5 : $300 \times 160 = 48\,000$ €

Total : $90\,000 + 95\,000 + 96\,250 + 35\,000 + 48\,000 = 364\,250$ €

**Réponse** : $\boxed{\text{Montant total} = 364\,250 \text{ €}}$

---

### Question 3b (0,5 pt) — Prix moyen

**Correction** : Le prix moyen d'une paire de lunettes est le montant total divisé par le nombre total de paires vendues :

$$\bar{p} = \dfrac{364\,250}{3\,575} \approx 101{,}8881\ldots \text{ €}$$

Arrondi au centime près :

**Réponse** : $\boxed{\bar{p} \approx 101{,}89 \text{ €}}$

---

## Récapitulatif barème

| Exercice | Thème | Points |
|---|---|---|
| 1 | Automatismes | 6 |
| 2 | Circuits (PGCD/PPCM) | 2 |
| 3 | Programme de calcul | 3 |
| 4 | Jardin botanique | 3 |
| 5 | Fonctions | 4 |
| 6 | Lunettes de soleil (tableur/stats) | 2 |
| **Total** | | **20** |

---

*Fin de la correction — DNB Blanc n°2 — Collège Gaston Chaissac, avril 2026.*
