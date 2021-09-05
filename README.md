# Final-Project

## Presentation

**Group Name:** Olympiads

**Topic:** Olympic Medal Predictor 

**Why This Topic:** The purpose of this project is to see what criteria will make a country more likely to win medals. We will be comparing country statistics such as population, GDP and GDP per capita to see if this can impact the likelihood that a country will win more medals.

**Description of Data Source:** By utilizing various dataset, the three outputs we would like to have is:
1. Gold Medalist Data from 1896 to 2020, such as name, country, height, weight, age, and year competed in the Olympic. This will be completed by merging the 1896 to 2016 Olympic data with the more recent 2020 Olympic.
2. Country Data, such as population and GDP.
3. Event Data, such as event name and gold medalist name. This will be completed by creating a separate DataFrame from the 1896 to 2016 Olympic data and the 2020 Olympic data.

This will be completed by utiliizing the following datasets:
- <a href="Resources/120 Years Of Olympic Data">1896 to 2016 Olympic Data</a>
- <a href="Resources/2021 Olympics">2020 Olympic Data</a>.
- <a href="Resources/World Population">World Population</a>
- <a href="Resources/World GDP">World GDP</a>

**Questions To Answer With The Data Source:** Based on the dataset, what criteria makes a country more likely to win medals in Olympics?

**Data Exploration:** Data cleaning and wrangling.

## Github

**Communication Protocols:** Our team's main form of communication will be through Slack, as well as our weekly classes.

**Individual Branches**
- Alysia Won's Branch Name: alysia-won
- Bala Banda's Branch Name: BalaBanda
- Frank Sun's Branch Name: frank-sun
- Steve Macpherson's Branch Name: smacpherson

## Database

### After analyzing our data, our team created an <a href="Database/ERD.png">ERD Database Draft</a>. In this draft, it will showcase how our current datasets link together.

The data will be split into three tables: the main medalists table that will contain the athletes and their stats, and two supporting tables sport and country. In order to ensure primary keys are unique we will assign an athlete_code comprised of athlete_name/country_code/year concatenated. We will assign an event code using event_name/year concatenated.

![ERD](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERD.png)

![ERDtables](https://github.com/alysiawon/Final-Project/blob/smacpherson/DB/ERDtables.PNG)

# Machine Learning

Forecasting the number of olympic medals for each country  is important to different stakeholders. Using the data sources listed above we aim to find out if  factors like GDP and Population impact the likelihood of a country winning more olympic medals.

### Problem Analysis
We will be using supervised machine learning, more specifically a random forest algorithm which takes into account more complex non-linear interactions. Our Dependent variable will be the number of medals and the key independent variables will be GDP and population.

Using the following data sets 120 years of olympics, worldwide GDP History and Population total for each country we will build a classifier that will help olympic stakeholders  classify whether a country will win more olympic medals compared to the past years given the population size and GDP of a country.

### Forecasting Process
1. We will import pandas, Numpy and Matplotlib
2. We will import our datasets and assign our X and Y variables and examine the dataset to ensure that they have been imported correctly
3. We will spit the dataset into a training and testing test. Where 80% of the data will represent the training set and 20 % will represent the test set.
4. We will then scale the data to increase the speed of the program by scaling down bitht the X_train and X_test data.
5. Once the training test is ready we can import the random forest classifier class and for the training set to our model
6. Then we can use the classifier.predict() function to predict the values for the test set and the values can be stored in a variable. 
7. The next step would be to determine the accuracy of the trained model by plotting a confusion matrix. The confusion matrix shows the number of correct and incorrect predictions on a classification problem when the real values of the test are known.
8. In the last step we visualize the results of the Random Classification model on a graph.

In our conclusion we aim to determine if our predictive model is accurate by comparing the results to the 2021 Tokyo olympic dataset to determine the accuracy of our model in the hopes that the stakeholders will be able to make more informed decisions to increase the likelihood of their country winning more medals.
=======