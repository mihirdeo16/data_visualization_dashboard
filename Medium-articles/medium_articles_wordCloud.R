# Import the libraries
library(tm)         # Text Mining Package
library(dplyr)      # Data Manupalication
library(wordcloud2) # Word clud package
library(extrafont)  # extrafont


# Select any of the publication,
## "Towards Data Science" 
color = c("#FFFFFF")
background = "#3D5977"

#publication = "Better Marketing"
#color = c("#FF0085","#FF00DD","#BA1D2F")
#background = "#FFFFFF"


# Read the csv file
df = read.csv("medium_data.csv") %>% filter(publication == "Towards Data Science")

# Build the data corpus
medium_corpus = Corpus(VectorSource(df$title))

# Function to remove the HTML data
removeHTML = function(text){
                          text = gsub(pattern = '<.+\\">', '', text)
                          text = gsub(pattern = '</.+>', '', text)
                          return(text)}

# medium corpus
medium_corpus = medium_corpus %>%
  tm_map(content_transformer(removeHTML)) %>%
  tm_map(removeNumbers) %>%
  tm_map(removePunctuation) %>%
  tm_map(stripWhitespace) %>%
  tm_map(content_transformer(tolower)) %>%
  tm_map(removeWords, stopwords("english")) %>%
  tm_map(removeWords, stopwords("SMART")) 

# Convert the medium corpus to matrix
medium_corpus = TermDocumentMatrix(medium_corpus) %>%as.matrix()

# Sort the words
medium_corpus = sort(rowSums(medium_corpus), decreasing = TRUE)

# Medium corpus
medium_corpus = data.frame(word = names(medium_corpus), freq = medium_corpus)

# Clean the data
medium_corpus = medium_corpus %>% filter(!word %in% c('—', "’"))

# Create word cloud
wordcloud2(medium_corpus,
           color = rep_len(color, nrow(medium_corpus)),
           backgroundColor = background,
           size = 1,
           rotateRatio = 0,
           )
