Levantar el proyecto por 1ra vez
=================================

Dentro de la carpeta  django

1- Instalamos el entorno virtual:

   pip install virtualenv

2- Crear el entorno virtual en este caso le vamos a llamar venv:

   python -m venv venv

3- Activamos el entorno virtual

   Si estan gitbash:

   source venv/Scripts/activate
 
   Si no tienen que entrar a venv\Scripts\ y ejecutar el archivo activate.
  
   - En ambos casos se van a dar cuenta que esta activado por que va a aparecer a la izquierda (venv) en la linea de comandos.


4- Una vez activado venv hay que instalar las requerimientos

   pip install -r requirements.txt


5- Por utlimo ya podemos ejecutar django

   Dentro de django/gec ejecutar

   python manage.py runserver



 En el dia a dia solamente el paso 3 y 5 para ejecturar el proyecto 
======================================================================

  * Es muy importante que se ejecute siempre el paso 3 ya que los requerimientos serian las dependencias del proyecto.


** Lo primero que van a tener que hacer es crear su aplicacion (que seria el modulo que se especifico en la evidencia 5) creear el modelo, serializer y views (logica) de los modelos que vayan a 
   hacer agregarlos a las urls para hacer las pruebas de sus ENDPOINTS.


Extras: (Para cuando necesitamos actualizar la base de datos y traer los nuevos modelos) 
==========================================================================================

se borran de la carpeta de migrations los archivos 0001_initial_py si hay
se borra primero la base de datos sqllite
se ejecuta el comando por cada modulo:  python manage.py makemigrations usuario y asi sucesivamente para cada uno de los modulos existentes 
Sucesivamente se ejecuta el comando:  python manage.py migrate

 Notas
==========

Cuando se desmadre todo con su modelo o view con la db, la opcion mas sana es borrar el archivo db.sqlite3 y en la carpeta /migrations todo los archivos que hagan referencia al modelo que esten tocando
pero no borren _init_.py de esa carpeta.

Borren tranquilo ya que luego con:

python manage.py makemigrations 
y luego
python manage.py migrate

se regeneran las tablas...lo malo si que van a perder la info cargada :P

 

ENDPOINTS DE USUARIO    (usar postman)
=======================

http://127.0.0.1:8000/api/usuarios    // con una solicitud GET trae la lista de usuarios
http://127.0.0.1:8000/api/usuarios/id   // con una solicitud GET trae los datos de un usuario en concreto
http://127.0.0.1:8000/api/usuarios/   // con una solicitud POST crea el usuario pero hay que enviarle el email y password

http://127.0.0.1:8000/api/usuarios/login/ // para loguearse



