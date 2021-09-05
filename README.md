# Final-Project

## Presentation

**Group Name:** Olympiads

**Topic:** Olympic Medal Predictor 

**Why This Topic:** The purpose of this project is to see what criteria will make a country more likely to win medals. We will be comparing country statistics such as population and GDP to see if this can impact the likelihood that a country will win more medals.

**Description of Data Source:** The three sources of data we will be utilizing is:
1. Gold Medalist Data from 1896 to 2020, such as name, country, height, weight, age, and year competed in the Olympic
2. Country Data, such as population and GDP
3. Event Data, such as event name and gold medalist name

**Questions To Answer With The Data Source:** What criteria makes a country more likely to win medals?

## Github

**Communication Protocols:** Our team's main form of communication will be through Slack, as well as our weekly classes.

**Individual Branches**
- Alysia Won's Branch Name: alysia-won
- Bala Bandna's Branch Name: BalaBanda
- Frank Sun's Branch Name: 
- Steve Macpherson's Branch Name: smacpherson

## Machine Learning

## Database
The data will be split into three tables: the main medalists table that will contain the athletes and their stats, and two supporting tables sport and country. In order to ensure primary keys are unique we will assign an athlete_code comprised of athlete_name/country_code/year concatenated. We will assign an event code using event_name/year concatenated.

![ERD](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERD.png)

![ERDtables](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERDtables.PNG)
