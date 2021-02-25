# ClickCraftApi


The api story is idle/click - crafting game
Users can mine ores and process them in corresponding crafting area (which is blacksmithing/tinkery).


I created this project to use diffrent types of API commands.
Use it as a coding reference.
I don't recommend you to use this structure, lots of things needs to be changed to apply realy world APIs.


You can do these to improve code:
-Use Relational Database.
-Hash Password.
-Use Post function instead Get in "GetUser". User won't see query in url, it will be much cleaner and safer.
-Character default values can be defined in characterModel instead defining in Register.
-You can add access level in user and check if user satisfies the acess  level
or matches the authentication(only admin can create item, admin can access all
 character data while users can access only their own).
