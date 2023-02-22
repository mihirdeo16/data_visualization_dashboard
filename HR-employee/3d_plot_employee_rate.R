# Import the library
library(rayshader)
library(ggplot2)
library(dplyr)
library(viridis)      

# Read the data ref: https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset
data <- read.csv("HR-Employee-Attrition.csv")

# Plot the ggplot
plot <- ggplot(data)+
        geom_point(aes(x=EmployeeNumber,y=HourlyRate,color=Age),size=3)+
        labs(x="Employee number",y="Hourly rate")+
        scale_colour_continuous(low = "#DBE2EF",high = "#3F72AF") +
        theme(panel.background = element_rect(fill = "#F9F7F7", colour = "#DBE2EF"),
           plot.title= element_text(face = "bold"))

# Create rayshader plot object
plot_gg(plot, width = 5, height = 5, multicore = TRUE, 
        scale = 250, windowsize = c(1400,866),zoom=0.70)

# Wait for system to process
Sys.sleep(0.2)

# Convert to png with title and right color 
render_snapshot("hr_employee_3d.png",clear = TRUE,
                title_color = "#112D4E",
                background = "#F9F7F7",
                title_text = "Employee number impact on hourly rate shaded by age"
                )

# Convert it to gif.
render_movie("hr_employee_3d.gif",
            type="oscillate",
            title_color = "#112D4E",
            background = "#F9F7F7",
            title_text = "Employee number impact on hourly rate shaded by age",
            zoom = 0.70
            )
