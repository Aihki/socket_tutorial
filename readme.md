# WebChat Application

käytetty tutoriaalia mikä opettaja oli antanut ja tästä lähetty uudistamaan tätä sekä lisätty muutamia uusia toimintoja. Vaihdoin var -> const. sekä tein omat tiedostot js ja tyyleille. Laitettu dockerin conttiin pyörimään locaalisti.

## Screenshots
### Entering Name
Nimi kentä tulee ensiksi näkymään
![Name](ss/name.png)

### Chat Screen
tyhjä chat screen jossa voi valita huoneen. simpellin näiköinen se.
![Chat Screen](ss/chatScreen.png)

### Chatting in a Room
Keskustelua huoneessa. kummatkin näkee oman viestinsä ja sekä toisen laittaman. Tästä näkee myös kuka liittyy ja kuka poistuu sekä kuka on laittanut tietyn viestin.
![Chatting](ss/chating.png)

### Selecting Room
toinen käyttäjä vaihtanut huonetta ja kirjoittaa sinne. Huoneita on valmiiksi tehty 4 ja ne valitaan dropvalikosta ja tämän jälkeen painaa join room. Kun vaihdat huonetta niin edellisestä huoneesta tämä käyttäjä disconnectataan sekä hän ei näe vahoja viestejä enään.
![Room](ss/room.png)
### Joining Another Room
![Joining Another Room](ss/joininAnotherRoom.png)
### Chatting in Another Room
![Chatting Another Room](ss/ChattingAnotherRoom.png)


### Going Back to First Room
menee takaisin ensimmäiseen huoneeseen
![Going Back to First Room](ss/GoingBackToFirstRoom.png)


### Tree user at the same time
kolme käyttäjää missä yksi on kerran vaihtanut kanavaa ja tullut takaisi
![Going Back to First Room](ss/threeUsers.png)

### azure sekä Web PubSub for Socket.IO
sain laitettua azureen sekä Web PubSub for Socket.IO. Näytti toimivan node ja dockerilla
![Going Back to First Room](ss/Azure.png)
