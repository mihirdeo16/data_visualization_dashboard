# Import the libraries
import pandas as pd
import plotly.express as px
import dash
import dash_bootstrap_components as dbc
from dash import html,dcc
from dash.dependencies import Input, Output, State

from alpha_vantage.timeseries import TimeSeries

# Enter the key for API ref: https://www.alphavantage.co/
key = 'Add you key #####'  #

# Create the object of time series
ts = TimeSeries(key, output_format='pandas')

# Open-source data - https://github.com/datasets
url = 'https://raw.githubusercontent.com/datasets/s-and-p-500-companies/master/data/constituents.csv'

# Read in the CSV file
usaStock_list = pd.read_csv(url)


# Define the app with the theme - ref: https://bootswatch.com/
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.CYBORG])

# Define the server
server = app.server

# Elements of the App
Header = html.H1("Stock analysis")
Header_size = {"size": 6, "offset": 4}
Header_div = html.Div([dbc.Row(dbc.Col(Header,width=Header_size))])

# Set the default values
DEFAULT_STOCK_VALUE = 'ACN'
DEFAULT_STOCK_NAME = 'Accenture plc'

# Dropdown menu
Drop_down = dcc.Dropdown(id='stock',
                        options=[{'label': y, 'value': x, }
                        for x, y in zip(usaStock_list['Symbol'], usaStock_list['Name'])],
                        value=DEFAULT_STOCK_VALUE,clearable=False,searchable=True,placeholder=DEFAULT_STOCK_NAME) 

# Dropdown the radio div
DropDrown_div = dbc.Col(children=[Drop_down],width={"size": 5, "offset": 2})

# Define the radio div
Radio_div = dbc.Col(html.Big(dcc.RadioItems(id='choose',
                                            options=[
                                                    {'label': 'Daily', 'value': 'daily'},
                                                    {'label': 'Weekly', 'value': 'weekly'},
                                                    {'label': 'Monthly', 'value': 'monthly'}
                                            ],
                                            value='daily',inline=True)), width=4)

# Define the app layout
app.layout = html.Div(
                [Header_div,
                html.Br(),
                html.Div([
                    dbc.Row(children=[DropDrown_div,Radio_div], align="center", justify="center"),
                html.Br(),
                dbc.Row(
                    dbc.Col(
                        dbc.Button('Apply', id='apply', n_clicks=0, color="primary"),
                        width={"size": 3, "offset": 5},
                    ),
                ),
                html.Br(),
                dbc.Row(
                    dbc.Col(dbc.Spinner(dcc.Graph(id="trading_graph"),
                                        color="primary", fullscreen=True)), justify="center",
                ),
    ])
])


# Define the call back as per figure
@ app.callback(
    Output('trading_graph', 'figure'),
    Input('apply', 'n_clicks'),
    [State('stock', 'value'),
     State('choose', 'value') ]
)
def update_graph(apply,stock, ch):

    # Filter the data based on values
    if(ch == 'daily'):
        ttm_data, ttm_meta_data = ts.get_intraday(
            symbol=stock, interval='1min', outputsize='compact')
    elif (ch == 'weekly'):
        ttm_data, ttm_meta_data = ts.get_weekly(
            symbol=stock)
    elif(ch == 'monthly'):
        ttm_data, ttm_meta_data = ts.get_monthly(
            symbol=stock)

    # Data transformation
    df = ttm_data.copy()
    df = df.reset_index().rename(columns={'4. close': 'close'})
    df.transpose()
    df = df[["close", "date"]]

    # Plot the line graph
    line_chart = px.line(
        data_frame=df,
        x='date',
        y='close',
        template='plotly_dark',
        title="Stock price: {} <br><sup>All values are in dollars of S&P 500 companies.</sup>".format(stock),
        labels={
                     "date": "Date",
                     "close": "Closing price in $"
        }
    )
    return line_chart

# Start the script/dashboard from here
if __name__ == '__main__':

    # Run the app
    app.run_server(debug=True)
