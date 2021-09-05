# Final-Project

## Presentation

**Group Name:** Olympiads

**Topic:** Olympic Medal Predictor 

**Why This Topic:** The purpose of this project is to see what criteria will make a country more likely to win medals. We will be comparing country statistics such as population and GDP to see if this can impact the likelihood that a country will win more medals.

**Description of Data Source:** By utilizing various dataset, the three outputs we would like to have is:
1. Gold Medalist Data from 1896 to 2020, such as name, country, height, weight, age, and year competed in the Olympic. This will be completed by merging the 1896 to 2016 Olympic data with the more recent 2020 Olympic.
2. Country Data, such as population and GDP.
3. Event Data, such as event name and gold medalist name. This will be completed by creating a separate DataFrame from the 1896 to 2016 Olympic data and the 2020 Olympic data.

This will be completed by utiliizing the following datasets:
- <a href="Resources/120 Years Of Olympic Data">1896 to 2016 Olympic Data</a>
- <a href="Resources/2021 Olympics">2020 Olympic Data</a>.
- <a href="Resources/World Population">World Population</a>
- <a href="Resources/World GDP">World GDP</a>

**Questions To Answer With The Data Source:** What criteria makes a country more likely to win medals?

## Github

**Communication Protocols:** Our team's main form of communication will be through Slack, as well as our weekly classes.

**Individual Branches**
- Alysia Won's Branch Name: alysia-won
- Bala Bandna's Branch Name: BalaBanda
- Frank Sun's Branch Name: frank-sun
- Steve Macpherson's Branch Name: smacpherson

## Machine Learning

Our Machine Learning model will focus on predicting how many medals a country will win based on a country's GDP and population.

The model will be a continous regressionn model.

## Database
<<<<<<< HEAD

After analyzing our data, our team created an <a href="Database/ERD.png">ERD Database Draft</a>. In this draft, it will showcase how our current datasets link together.
=======
The data will be split into three tables: the main medalists table that will contain the athletes and their stats, and two supporting tables sport and country. In order to ensure primary keys are unique we will assign an athlete_code comprised of athlete_name/country_code/year concatenated. We will assign an event code using event_name/year concatenated.

![ERD](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERD.png)

![ERDtables](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERDtables.PNG)
>>>>>>> 1eb367cb371d547f499566ff152080a7b3a0d463
