import streamlit as st
import pandas as pd
import math
import numpy as np
import plotly.figure_factory as ff
import plotly.express as px
import time


# Creating a dictionary that maps the year to the column name.
year_column_mapping = {
    "2018":"Value_2018",
    "2019":"Value_2018",
    "2020":"Value_2020",
}

df = pd.read_csv("Data/Bugard_ingredients.csv")

items_list = list(df.Item.unique())

# Creating a list of strings that are used to convert the numbers into a string with the
# correct metric prefix.
millnames = ['',' Thousand',' Million',' Billion',' Trillion']

def millify(n):
    """
    > It takes a number, converts it to a float, and then returns a string with the number and a metric
    prefix
    
    :param n: the number to be converted
    :return: the number of the millidx.
    """
    n = float(n)
    millidx = max(0,min(len(millnames)-1,
                        int(math.floor(0 if n == 0 else math.log10(abs(n))/3))))
    return '{:.3f}{}'.format(n / 10**(3 * millidx), millnames[millidx])

@st.cache
def item_average(temp, item_selected):
    """
    It takes in a list of items, and returns a dataframe with the average of each item for each year
    
    :param item_selected: a list of items you want to plot
    :return: A dataframe with the average of the selected items for each year.
    """
    data = {}
    temp = df.loc[df['Item']==item_selected][year_column_mapping.values()].mean()

    data[item_selected] = temp.values
    data["Year"] = year_column_mapping.keys()
    result = pd.DataFrame(
        data=data
    )
    return result

@st.cache
def avg_production(df,item_selected):
    """
    It takes a dataframe as input and returns a dataframe with the average production of each year and
    the total production of each year
    
    :param df: The dataframe that contains the data
    :return: A dataframe with the average production of each year and the total production of each year.
    """

    data = {}
    data["Year"] = year_column_mapping.keys()
    temp = df[year_column_mapping.values()].mean()
    data["Average Production"] = list(temp.values)


    temp = df[year_column_mapping.values()].sum()
    data["Total Production"] = list(temp.values)

    result = pd.DataFrame(
        data=data
    )
    return result


#  Set the App display
col1,col2 = st.columns([3,1])
with col1:
    st.markdown("## Overall Production Analysis for 2018 to 2020.")
with col2:
    st.image("assest/hamburger.png",width=100)


col1,col2 = st.columns([1,3])
with col1:
    year = st.selectbox("Select the year :",year_column_mapping.keys())

with col2:
    item = st.selectbox("",items_list)

total_production_df = avg_production(df,item)


total_production = millify(total_production_df.loc[total_production_df.Year==year]["Total Production"])
avg_rate = millify(total_production_df.loc[total_production_df.Year==year]["Average Production"])


col1, col2 = st.columns(2)

col1.metric("Total Production", total_production)
col2.metric("Avg Production", avg_rate)

num = st.slider('How many countries to consider', 2,30 , 5)


item_df = df.loc[df['Item']==item][["Country",year_column_mapping[year]]].sort_values(by=[year_column_mapping[year]],ascending=False).rename(columns={year_column_mapping[year]:"Values in Tonnes"}).reset_index(inplace=False,drop=True)[:num]

fig = px.bar(item_df, x="Values in Tonnes", 
                y="Country", 
                title="Top ten countries which produced good",
                template = "simple_white")
st.plotly_chart(fig)
st.table(item_df)