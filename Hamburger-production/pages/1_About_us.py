import streamlit as st

import streamlit as st

st.balloons()

col1, col2 = st.columns(2)

with col1:
    st.image("assest/Profile.png")
    st.markdown("## Mihir Deo")
    st.markdown("I am graduate Analytics student; I am here to talk about food production.  You can find me at: \n deo.mi@northeastern.edu or [mihirdeo16.com](mihirdeo16.com)")

with col2:
    st.image("assest/Profile_1.png")
    st.markdown("## Balram Marni")
    st.markdown("I am graduate Analytics student; I am here to talk about food production. You can find me at:  \n marni.bi@northeastern.edu")