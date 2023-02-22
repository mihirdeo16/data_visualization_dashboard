import streamlit as st

col1,col2 = st.columns([3,1])
with col1:
    st.markdown("# World-wide food production analysis of Hamburger")
with col2:
    st.image("assest/hamburger.png",width=200)



st.markdown("## Let’s start with the business context and data source.")


st.markdown("""
### Context
A multi-national fast-food chain company who sales the burger is look for reducing their operational cost and optimize their supply chain flow.

### Audience
Business strategy and decision committee who will take key decision regarding supply chain logistics.

### Objectives
To understand the trend from last **three years** for following ingredients.
"""
)
col1,col2,col3,col4,col5 = st.columns(5)

with col1:
    st.image("assest/cheese.png",caption="Cheese")

with col2:
    st.image("assest/grain.png",caption="Wheat")

with col3:
    st.image('assest/onion.png',caption="Onion")
with col4:
    st.image("assest/garlic.png",caption="Garlic")

with col5:
    st.image("assest/spice.png",caption="Black pepper")

st.markdown("""
### Data

*[Food and Agriculture Organization of the United Nations](https://www.fao.org/faostat/en/#data/QCL)*
It gathers information on food products from various nations. 


This data is released under the [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/3.0/igo/) license

""")