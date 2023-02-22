import streamlit as st
import pandas as pd
import math
import numpy as np
import plotly.figure_factory as ff
import plotly.express as px
st.set_page_config(layout="wide")

# Import the data
df = pd.read_csv("Data/CropProduction_2016_2020.csv")

# Creating a variable called items_count that is the number of unique items in the dataframe.
# also creating a variable called items_list that is a list of the unique items in the dataframe.
items_count = df.Item.nunique()
items_list = list(df.Item.unique())

# Creating a dictionary that maps the year to the column name.
year_column_mapping = {
    "2016":"Value_2016",
    "2017":"Value_2017",
    "2018":"Value_2018",
    "2019":"Value_2018",
    "2020":"Value_2020",
}
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
def item_average(item_selected):
    """
    It takes in a list of items, and returns a dataframe with the average of each item for each year
    
    :param item_selected: a list of items you want to plot
    :return: A dataframe with the average of the selected items for each year.
    """
    data = {}
    for i in item_selected:
        temp = df.loc[df['Item']==i][year_column_mapping.values()].mean()
        data[i] = temp.values
    data["year"] = year_column_mapping.keys()
    result = pd.DataFrame(
        data=data
    )
    result.set_index("year",inplace=True)
    return result

@st.cache
def avg_t_production(df):
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

    data['Production Rate'] = ((data["Average Production"] -data['Average Production'][0] )/ data['Average Production'][0]) * 100
    data['Production Rate']  = data['Production Rate'].round()

    result = pd.DataFrame(
        data=data
    )
    return result


# Set the App display

# Define layout for Title, by split the data
left, right = st.columns([1, 2])

# Add information and logo
with left:
    st.image('assest/crop.png',caption='Crop Image', width=120)
with right:
    st.header("Worldwide food production")

# This is creating a sidebar in the app.
with st.sidebar:
    st.write("""This data is taken from the Food and Agriculture Organization of the United Nations.It gathers information on food products from various nations. This data is released under the Creative Commons license.""")
    st.write("More information can be found at [Food and Agriculture Organization](https://www.fao.org/home/en)")

# This is creating a header in the app.
st.write("## Overall Crop Production Analysis.")

# This is creating a column in the app. The first argument is the width of the column and the
# second argument is the number of columns.
col1,_ = st.columns([1,3])
with col1:
    year = st.selectbox("Select the year :",year_column_mapping.keys())


# This is creating a dataframe with the average production and the total production for each year.
total_production_df = avg_t_production(df)

# This is creating a variable called total_production that is the total production for the year that
# is selected.
total_production = millify(total_production_df.loc[total_production_df.Year==year]["Total Production"])

# This is creating a variable called avg_rate that is the average production for the year that
# is selected.
avg_rate = millify(total_production_df.loc[total_production_df.Year==year]["Average Production"])

# This is creating a variable called production_rate that is the production rate for the year that
# is selected.
production_rate = millify(total_production_df.loc[total_production_df.Year==year]["Production Rate"])


# This is creating three columns in the app. The first column is called col1, the second is called
# col2, and the third is called col3.
col1, col2, col3 = st.columns(3)

# This is creating a metric in the app. The first argument is the title of the metric and the
# second argument is the value of the metric.
col1.metric("Total Production", total_production)
# Creating a metric in the app. The first argument is the title of the metric and the
# second argument is the value of the metric.
col2.metric("Avg Production", avg_rate)
# This is creating a metric in the app. The first argument is the title of the metric and the
# second argument is the value of the metric.
col3.metric("Production Rate", f"{production_rate}%")


# This is creating two tabs in the app.
tab1,tab2 = st.tabs(["Tabular", "Visualize"])

# This is creating a tab in the app called tab1. Then it is writing the text "Summary table of
# production" and then it is creating a table with the dataframe total_production_df.
with tab1:
    st.write("Summary table of production")
    st.table(data=total_production_df)

# This is creating a line chart with the x axis being the year and the y axis being the production
# rate.
with tab2:
    st.write("Production rate vs year")
    st.line_chart(total_production_df,x="Year",y="Production Rate")

# Individual Section
st.markdown("## Individual Crop Analysis")

# This is a string formatting. The `f` before the string tells python that this is a formatted string.
# The `{}` is where you put the variable you want to insert into the string.
# This is a string formatting. The `f` before the string tells python that this is a formatted string.
# The `{}` is where you put the variable you want to insert into the string.
st.markdown(f"This data hold total **{items_count}** food items. The data of crop production varies from {list(year_column_mapping.keys())[0]} to {list(year_column_mapping.keys())[-1]}.")

# This is a function that is creating a dropdown menu with the items_list as the options. The default
# is the third and fourteenth item in the list.
item_selected = st.multiselect("Food items,",items_list,default=[items_list[2],items_list[13]])

# This is a list comprehension that is converting the list of items into a string.
item_selected_p = ','.join(map(str, item_selected))

@st.cache
def item_average_box(item_selected,year):
    """
    This function takes in a list of items and a year and returns a dataframe with the country, the
    year, and the item
    
    :param item_selected: a list of items you want to see
    :param year: The year you want to look at
    :return: A dataframe with the country, year, and item columns
    """
    temp = df.loc[df['Item'].isin(item_selected)][["Country",year_column_mapping[year],"Item"]]
    return temp


# Creating two tabs in the app.
tab1,tab2 = st.tabs(["Tabular", "Visualize"])

# Creating a tabular view of the data.
with tab1:
    st.write(f"Area chart for the food items {item_selected_p}")
    chart_data = item_average(item_selected)
    st.area_chart(chart_data)

# Creating a box plot for the selected items.
with tab2:
    year_box = st.selectbox("Select year :",year_column_mapping.keys())
    temp = item_average_box(item_selected,year_box)
    fig = px.box(temp, y=temp.columns[1],x="Item")
    st.plotly_chart(fig)
