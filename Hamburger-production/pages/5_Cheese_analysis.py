
import streamlit as st
import pandas as pd
import math
import numpy as np
import plotly.figure_factory as ff
import plotly.express as px
import plotly.graph_objects as go

cheese = pd.read_csv("Data/Cheese_data.csv")

items_list = list(cheese.Item.unique())

# Creating a dictionary that maps the year to the column name.
year_column_mapping = {
    "2018":"Value_2018",
    "2019":"Value_2018",
    "2020":"Value_2020",
}

#  Set the App display
col1,col2 = st.columns([3,1])

with col1:
    # A markdown cell.
    st.markdown("## Deep-dive in Cheese Production Analysis")
with col2:
    st.image("assest/cheese_type.png",width=100)


col1,col2 = st.columns([1,3])
with col1:
    year = st.selectbox("Select the year :",year_column_mapping.keys())

with col2:
    item = st.selectbox("",items_list)

@st.cache
def cheese_average(temp_df, item_selected):
    """
    It takes in a list of items, and returns a dataframe with the average of each item for each year
    
    :param item_selected: a list of items you want to plot
    :return: A dataframe with the average of the selected items for each year.
    """
    data = {}
    temp = temp_df.loc[temp_df['Item']==item_selected][year_column_mapping.values()].mean()

    data[item_selected] = temp.values
    data["Year"] = year_column_mapping.keys()
    result = pd.DataFrame(
        data=data
    )
    return result

num = st.slider('How many countries to consider', 2,30 , 5)

order = st.radio("Order by : ",('Top', 'Bottom'),horizontal=True)

if order=="Top":
    order_flag = False
else:
    order_flag = True

cheese_df = cheese.loc[cheese['Item']==item][["Country",year_column_mapping[year]]].sort_values(by=[year_column_mapping[year]],ascending=order_flag).rename(columns={year_column_mapping[year]:"Values in Tonnes"}).reset_index(inplace=False,drop=True)[:num]

fig = px.bar(cheese_df, x="Values in Tonnes", 
                y="Country", 
                title=f"{order} ten countries which produced good",
                template = "simple_white")
st.plotly_chart(fig)
st.table(cheese_df)


cheese_df = cheese_average(cheese,item)
st.markdown("Yearly performance of the product.")
st.table(cheese_df)
fig2 = px.pie(cheese, values=year_column_mapping[year], 
            names='Item', 
            title='Analysis with comparison with other products.',
            )
st.plotly_chart(fig2)