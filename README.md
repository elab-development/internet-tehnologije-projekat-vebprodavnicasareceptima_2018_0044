
# Korpa+

Dobrodošli u Korpa+, veb prodavnicu namernica za ljubitelje kuvanja koji žele sve što im je potrebno za zdrav i kvalitetan obrok da pronađu na jednom mestu. Aplikacija omogućava korisnicima da pretražuju recepte, dodaju sastojke u korpu i organizuju svoje narudžbine jednostavno i brzo.

## Instalacija i pokretanje projekta

Pratite korake ispod da biste pokrenuli aplikaciju na svojoj lokalnoj mašini:

1. Klonirajte projekat iz Git repozitorijuma na lokalnu mašinu:
```bash
  git clone https://github.com/elab-development/internet-tehnologije-projekat-vebprodavnicasareceptima_2018_0044.git
```
2. Instalacija
```bash
cd korpa-plus
composer install
npm install
```
3. Konfiguracija okruženja

Kreirajte .env fajl kopiranjem postojećeg .env.example:
```bash
  cp .env.example .env
```
Ažurirajte sledeće parametre u .env fajlu

- Parametri baze
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306    
DB_DATABASE=ime_baze
DB_USERNAME=korisnicko_ime
DB_PASSWORD=lozinka
```

- Stripe API ključev

```
STRIPE_SECRET=vaš_secret_key
STRIPE_PUBLIC=vaš_public_key
```

- Kuponify API token

```
KUPONIFY_API_TOKEN=vaš_token
```

4. Migracija baze podataka
Pokrenite migracije za kreiranje baza i učitavanje početnih podataka.

```bash
  php artisan migrate --seed
```

5. Pokretanje projekta

```bash
php artisan serve
npm run dev
```
## Funkcionalnosti

1. Recepti
- Pregled, filtriranje i pretraga recepata.
- Detaljan prikaz recepta sa uputstvima i sastojcima.
2. Korpa
- Automatsko kreiranje korpe za svakog korisnika.
- Dodavanje sastojaka u korpu direktno sa stranice recepta.
- Modifikacija količina i uklanjanje stavki iz korpe.
3. Kupovina
- Generisanje narudžbina sa svim detaljima korisnika.
- Plaćanje putem Stripe integracije.
- Kuponi za popuste putem Kuponify API-ja.
4. Statistika
- Prikaz podataka o najčešće dodavanim sastojcima u korpu.
- Vizualizacija korišćenjem Chart.js.
## Tehnologije

Backend: Laravel 10 

Frontend: React 

Baza podataka: MySQL


## 

Za dodatne informacije, pitanja ili prijavu grešaka, slobodno me kontaktirajte putem studentskog mejla.

