---
title: "Predicting Crime Rates with Economic Indicators"
description: "Using R and multivariate linear regression to predict neighborhood crime rates based on economic factors in Austin, TX"
date: "03/12/2021"
repoURL: "https://github.com/pmeaney/r_projects/blob/master/vFinalVersion_projectScript.R"
---

<div class="flex flex-row gap-6 my-4 items-center justify-start">
  <div class="w-1/3 flex justify-center">
    <img src="/images-tool-logos/for-site/r-logo.svg" alt="R Programming Language" class="h-24 max-w-full object-contain" />
  </div>
  <div class="w-1/3 flex justify-center">
    <img src="/images-tool-logos/for-site/d3.png" alt="D3.js" class="h-20 max-w-full object-contain" />
  </div>
</div>

## Project Overview

As part of my graduate statistics course "Advanced Statistical Methods", I built a predictive model using R to answer a specific research question: **To what degree can a neighborhood's crime rates be predicted with economic factors?**

Specifically, I investigated whether crime per capita in Austin, TX zipcodes could be predicted using three economic indicators: percentage of population below poverty level, median household income, and median rent price.

After data engineering multiple public datasets and testing various predictive models, **I developed a multivariate linear regression model that successfully predicts Assault, Burglary, and Robbery rates with 70-80% confidence**. This demonstrates a strong correlation between economic health and certain crime types. The methodology could be scaled up for business forecasting, policy analysis, or urban planning applications.

## The Model

The final predictive equation I developed uses three economic factors to predict crime per capita at the zipcode level:

## The Model

<div class="my-8 space-y-4">
  <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
    <p class="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-2">QUESTION</p>
    <p class="text-lg">To what degree can three economic factors predict rates of each type of crime?</p>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">(Types of Crime: Theft, Burglary, Assault, Robbery, Rape, Homicide)</p>
  </div>
  
  <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
    <p class="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">ANSWER</p>
    <p class="text-lg"><strong>Assault, Burglary, and Robbery show a 70-80% predictive correlation</strong> with neighborhood economic factors, demonstrating they are strongly influenced by economic health. However, crimes such as Rape and Homicide show no reliable correlation with economic indicators, suggesting they are driven by other factors beyond neighborhood economics.</p>
  </div>
</div>

<div class="my-8">
  <div class="flex flex-col md:flex-row items-center justify-center gap-4">
    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-2 border-green-600">
      <p class="text-xs font-semibold text-green-700 dark:text-green-400 text-center mb-3">ECONOMIC FACTORS</p>
      <div class="flex flex-col gap-3">
        <div class="bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-lg border-2 border-green-500 text-center min-w-[180px]">
          <p class="font-semibold text-sm">% Below Poverty</p>
        </div>
        <span class="text-xl font-bold text-center">×</span>
        <div class="bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-lg border-2 border-green-500 text-center min-w-[180px]">
          <p class="font-semibold text-sm">Median Income</p>
        </div>
        <span class="text-xl font-bold text-center">×</span>
        <div class="bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-lg border-2 border-green-500 text-center min-w-[180px]">
          <p class="font-semibold text-sm">Median Rent</p>
        </div>
      </div>
    </div>
     <span class="text-3xl font-bold mx-4">=</span>
    <div class="bg-blue-100 dark:bg-blue-900/30 px-8 py-6 rounded-lg border-2 border-blue-500 text-center min-w-[200px]">
      <p class="font-semibold">Crime per Capita</p>
    </div>
  </div>
  <p class="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
    Where Crime = Assault, Robbery, Burglary, or Theft, and × = interaction effects
  </p>
</div>
Where Crime includes Assault, Robbery, Burglary, or Theft, and × represents interaction effects between the variables.

## Trained Model Results

The charts below show three separate tests of the model's predictive accuracy. Each test uses a randomly selected 80% training set and validates against the remaining 20% of data:

- **Green lines** = 95% confidence interval boundaries
- **Red line** = predicted average
- **Black line** = actual test data

The model performs particularly well for burglary, assault, and robbery predictions, with the confidence intervals capturing most of the actual data points.

### Test 1: Model Performance

![Statistical model test 1](/images-old-projects/stats/test1.png)

### Test 2: Model Performance

![Statistical model test 2](/images-old-projects/stats/test2.png)

### Test 3: Model Performance

![Statistical model test 3](/images-old-projects/stats/test3.png)

## How It Works

The project addresses a specific research question: **To what degree can a neighborhood's crime rates be predicted with economic factors?**

Specifically, can we predict crime per capita in a zipcode using:

1. % of Population Below Poverty Level
2. Median Household Income
3. Median Rent Price

The answer is yes—quite strongly, with 70-80% confidence depending on crime type in Austin, TX.

## Data Engineering Process

I aggregated and cleaned data from multiple public sources:

**2014 Housing Market Analysis Dataset** (Austin Open Data): Provided economic indicators including poverty levels, median household income, and median rent prices by zipcode.

**2014 Crime Dataset** (Austin Open Data): 40,000+ crime records. I used regex to aggregate and standardize crime category names into six types: Assault, Burglary, Robbery, Theft, Homicide, and Rape.

**2012 US Population Per Zipcode** (R's built-in library): Accessed via `data(df_pop_zip)` to normalize crime counts into per-capita rates.

**2015 U.S. Gazetteer Geographic Data** (US Census): While included in the final dataset, this geographic data didn't make it into the final model.

The result was a clean, engineered dataset with 36 Austin zipcodes containing both economic indicators and crime statistics, allowing for multivariate analysis.

## Key Findings

According to the coefficient of determination (R²) for the various models, **about 70-80% of the variability in Assault, Burglary, and Robbery can be explained by the variability in the selected economic indicators**. This is a remarkably strong correlation, meaning these three crime types are heavily influenced by the economic health of a neighborhood.

Interestingly, the other crime types examined—homicide and rape—showed no reliable correlation with economic indicators, suggesting they're driven by other factors not captured in this economic model.

## Model Validation

The ultimate goal was to create a statistical model from training data and then test it against held-out test data to verify its predictive power. By training the model on 80% of the dataset and testing on the remaining 20%, I could assess how well economic factors predict crime rates in practice.

The visualization charts demonstrate that the model's 95% confidence intervals (green lines) successfully capture the majority of actual test data points (black line), with the predicted average (red line) tracking closely to reality. This confirms the model is genuinely predictive, not just descriptive of the training data.

## Choropleth Visualization

One of my favorite data visualization techniques is the choropleth map (heatmap). Here's a visualization of assault frequency across Austin zipcodes in 2014:

![Austin assault choropleth map](/images-old-projects/stats/austin_assault_choropleth_map.png)

## Why Statistical Analysis Matters

I enjoy statistical analysis because it's a creative, puzzle-solving way of thinking that allows us to explain the world through data in meaningful, measurable ways.

Throughout this statistics course, I noticed my thought processes changing. Working on this project fundamentally shifted how I approach problems—toward more analytical, data-driven, and equation-based thinking. Crafting equations from data is like solving a puzzle where you can produce real, fascinating answers from apparently unrelated datasets.

Beyond changing how you think, practicing statistics through programming improves your coding abilities. Learning R strengthened my programming skills because before analyzing data, I spent significant time understanding R's data types and structures, knowledge that transfers to other languages and projects.

Statistical analysis with multivariate methods is valuable for empirically analyzing all kinds of questions: business decisions, scientific and engineering projects, economic theories, or policy arguments. Being able to formulate an equation or model based on data is a powerful skill.

---

## Technologies Used

- **R** - Statistical computing and modeling
- **D3.js** - Data visualization
- **Multivariate Linear Regression** - Predictive modeling technique
- **Public Open Data** - Austin government datasets
