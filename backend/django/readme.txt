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