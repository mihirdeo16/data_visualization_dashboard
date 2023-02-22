# Import the library
library(rayshader)
library(ggplot2)
library(dplyr)
library(viridis)      # Import the viridis

data = read.csv("HR-Employee-Attrition.csv")


plot = ggplot(data,aes(Age,HourlyRate))+
    geom_hex(bins = 20, size = 0.5, color = "black") + 
    scale_fill_viridis_c("EnvironmentSatisfaction")+
    labs(title = "How age impact the hourly rate",
        x="Age",y="Hourly Rate")
        #+
    #theme(panel.background = element_rect(fill = "white", colour = "grey50"),
     #       plot.title= element_text(face = "bold"))

plot
plot_gg(plot, width = 5, height = 5, multicore = TRUE, scale = 250, 
        zoom = 0.7, theta = 10, phi = 30, windowsize = c(800, 800))
Sys.sleep(0.2)
render_snapshot(clear = TRUE)


