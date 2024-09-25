SPRINT 1:

La web esta dividida en 3 partes:
HEADER  => este es el componente Header la cual contiene logo, y botones iniciar sesion y crear cuenta, este componenta se muestra siempre por
mas que navegemos y cambiemos de paginas siempre debe de estar y esta fijo al hacer scroll  (esto se encuentra en la carpeta Components)
Footer => este es el componente Footer, el cual igual que el HEADER se muestra en todas las paginas, la diferencia es que no esta fijo.(esto se encuentra en la carpeta Components)
Home => este componente lo vamos a encontrar en la carpeta Page, y es todo lo que esta entre el HEADER Y EL FOOTER, es lo primero  que vemos al ingresar, esta parte esta divido en 3 secciones (3 div ):
Div que tiene el el componente Form donde los input son a donde vamos? y cuando?
Luego esta el div Experiencias (que serian las categorias) en donde en esta seccion debemos mostrar destinos aleatoriamente
El 3er div es el de recomendaciones en donde mostramos todos los destinos que tenemos

Componentes para reutilizar:
Button 
CardRandom => Estas son los tours de categoria, los que se tiene que mostrar aleatoriamente, este componente esta utilizado en el Home 
CardTour => Estas son las todos los tour que tenemos, tambien esta utilizado en el home
Form => Es el componente que podemos reutilizar tanto en el home, como en la pagina de iniciar sesion

Carpeta Page :
Contiene las paginas que debemos mostrar:
Home => lo que vemos al ingresar la pagina
Detail => Es lo que mostramsos al hacer click en alguno de los tour que mostramos en la seccion recomendaciones (que se encuentra en el home)
Login => Esta pagina esta incativa porque no lo pide en el primer sprint, pero ya se empezo a construir, para activarla descomentar en el header los link que rodean al boton de iniciar sesion y descomentar su ruta en el app.jsx 