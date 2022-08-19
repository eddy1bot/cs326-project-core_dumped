# The Parachute Project (milestone 3)
## Team name: *core_dumped*
## Team Overview:
- *Eddy Botelho - eddy1bot*

## Application Idea (original)
My initial idea is to create an application which allows users a simple way
to maintain control over their finances. This application, ideally, will
interact with some form of an off-system database which will store information
regarding user 'virtual accounts', paychecks, income, expendatures, etc.
I am currently using a fairly complicated excel spreadsheet to manage my
personal finances, and over the years I have desired to share this system
with friends and family, however, it is extremely inaccessable and overly
complicated. I hope to design a web application which provides a clean and
inviting UI, but is backed with the efficacy of the existing spreadsheet design.


## Functionality (Actual/Final result)
The final result of my efforts is an application which is well rounded, albiet
sometimes lacking in the depth which I had initially envisioned for it.
In other words, the application delivers in all three areas which I had hoped
that it would:
1. A functional UI
2. majority of features from my initial spreadsheet design
3. persistent database system

The app certainly has its lacks, however, these lacks are made up almost
exclusively by components which are already present in the current application.

For example, I am lacking the promised "virtual accounts" feature, however,
adding this would simply consist of adding a new database table to store
accounts, adding new UI buttons to view, create, update, and delete these
accounts, and new client-side crud operations to support the UI buttons--all
things which are, in one way or another, incorporated in the current app.....
Currently a database is used to store expense and transaction logs, UI buttons
are used to CRUD the transaction logs, and CRUD operation functions used to
bridge the gap between the UI and the server/database. Therefore, I am overall
pleased with my final product and I know that with more time, I have clearly
demonstrated that I am capable of implementing all features necessary to fully
deliver on what was promised.

### Link to Loom screen recording of app running
### https://www.loom.com/share/f28f58947ebb4f7289820acef04b51e6

### Link to application running on Heroku
### https://powerful-meadow-74290.herokuapp.com/