import streamlit as st


st.code("""

# pip install streamlit
# run :- streamlit run temp.py

import streamlit as st
import pandas as pd
import numpy as np

st.markdown("##Hi 👋🏼 !! ")

st.markdown("### 🏗️lets built the web-app powered by Python.")

st.balloons()

st.image()

st.markdown("📉 Analyze the chart data")
# Area chart
chart_data = pd.DataFrame(
    np.random.randn(20, 3),
    columns=['a', 'b', 'c'])
st.area_chart(chart_data)

st.markdown("About me & Contact me 📪. @deo.mi@northeastern.edu")

links - https://docs.streamlit.io/library/api-reference
""",
language="python")