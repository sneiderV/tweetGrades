# TweetGradees

Este es el proyecto final del curso Programación con tecnologías Web de la Universidad de Los Andes. 



*TweetGrades* permite a los estudiantes de la materia visualizar en tiempo real los resultados de los tweets realizados
con los tags **"#WebDev @Uniandes"** (mecanismo de control de lectura). El estudiante puede visualizar qué tweets se han publicado
y qué nota se ha obtenido para cada clase del semestre.

Del mismo modo los calificadores (monitores y profesores) pueden obtener los tweets disponibles y asignarle los respectivos puntos 
a cada estudiante. El sistema automáticamente detecta a qué clase pertenece cada tweet dada la fecha.

***TweetGrades* fue desarrollado usando las siguientes tecnologías:**

### Servidor público:

Heroku.

### Back End: 

MongoDB, Meteor, Node y javascript.

### Front End:

* React, JavaScript, CSS
* Boostrap, SweetAlert, HammerJS, moment.

## Despliegue

Si desea interactuar con el estado actual de nuestra aplicación , solo necesita abrir en su navegador favorito la siguiente URL: [Tweet Grades](http://tweetgrades.herokuapp.com/) , 
pero si usted prefiere descargar el proyecto, debe ejecutar los sieguientes comandos en el directorio donde ubique el proyecto:

**Clone el repositorio**

> git clone https://github.com/sneiderV/tweetGrades.git

**En el directorio raíz del proyecto**

> meteor npm i

**Para usar el API de twitter** se requiere la configuración de las siguientes variables de entorno:

* TW_CONSUMER_KEY
* TW_CONSUMER_SECRET
* TW_ACCESS_TOKEN
* TW_ACCESS_SECRET

Una vez instaladas todas las dependencias, se podrá realizar el despliegue local de la aplicación. Para esto debe ubicarse 
en el directorio raiz y ejecutar el siguiente comando:

> meteor

Tras realizar estos pasos, podrá visualizar la aplicación web abriendo cualquier navegador web en la url http://localhost:3000/

*nota: Recuerde tener configurado meteor y mongo en su máquina local.*


## Licencia
Este proyecto cuenta con la licencia estándar MIT license

## Autores
* Esneider Velandia
* Fabio Lopez  
