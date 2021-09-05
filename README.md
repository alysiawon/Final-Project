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