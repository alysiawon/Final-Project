# Final-Project

## Presentation

**Group Name:** Olympiads

**Topic:** Olympic Medal Predictor 

**Purpose Of The Project:** The purpose of this project is to comparing country statistics such as population and GDP to see if this can impact the likelihood that a country will win more medals. 

**Description of Data Source:** By utilizing various dataset, the three outputs we would like to have is:
1. Gold Medalist Data from 1896 to 2020, such as name, country, height, weight, age, and year competed in the Olympic. This will be completed by merging the 1896 to 2016 Olympic data with the more recent 2020 Olympic.
2. Country Data, such as population and GDP.

This will be completed by utiliizing the following datasets:
- <a href="Resources/120 Years Of Olympic Data">1896 to 2016 Olympic Data</a>
- <a href="Resources/2021 Olympics">2020 Olympic Data</a>.
- <a href="Resources/World Population">World Population</a>
- <a href="Resources/World GDP">World GDP</a>
- <a href="Resources/World Coordinates">World Coordinates</a>

**Questions To Answer With The Data Source:** Based on the dataset, does population and GDP make a country more likely to win medals in Olympics?

**Data Exploration:** Data cleaning and wrangling.

## Github

**Communication Protocols:** Our team's main form of communication will be through Slack, as well as our weekly classes.

**Individual Branches**
- Alysia Won's Branch Name: alysia-won
- Bala Banda's Branch Name: BalaBanda
- Frank Sun's Branch Name: frank-sun
- Steve Macpherson's Branch Name: smacpherson

## Database

After analyzing our data, our team created an <a href="Database/ERD.png">ERD Database Draft</a>. In this draft, it will showcase how our current datasets link together.

The data that has been created is:
1. Olympic History Data showcasing country name, country code, GDP, population and gold medals won
2. 2020 Olympic Data showcasing only 2020 Olympic Data
3. Olympic History and Mapping information showcasing country name, country code, GDP, population, latitude, longitude and gold medals won


## Dashboard

In our dashboard, we will be highlighting two key items:
1. Olympic Gold Medal Predictor
2. Olympic History

### Olympic Gold Medal Predictor

The purpose of this section is to allow the user to input any GDP and/or population, and our machine learning system will populate:
- How many medals will you win?
- What would your rank be based on the 2020 Olympics?
- A table to show where you would be ranked

Here is our <a href="https://docs.google.com/presentation/d/1xsYqW0NIX3Om_aYEWKTWvCO6CjRhGKa_lj4cfL7tMfA/edit?usp=sharing">Dashboard Draft</a>.

### Olympic History

The purpose of this section is to let the user select a previous Olympic year and our system will populate:
- A table to show where you would be ranked
- A bar graph to visualize the table
- A map to showcase the country with the most medals

## Machine Learning 

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
