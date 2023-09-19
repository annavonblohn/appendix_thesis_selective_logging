# Function newly implemented for selective logging module
#!/bin/bash
# delete existing logging_input.txt
rm -r logging_input.txt
# loop over years from 1911 - 2311
for year in {1981..2311}; do
    echo "Year: $year"

# check if year is divisible by 50 (replace with desired logging cycle) and between 2015 - 2090 
     if (( (year - 2014) % 50 == 1 && year >= 2015 && year <= 2090 )); then
        for i in {0..199}; do
# replace with desired DBH treshold
            echo "0.35" >> logging_input.txt
        done
# for years without logging, insert -1 as DBH threshold
    else
        for i in {0..199}; do
            echo "-1.0" >> logging_input.txt
        done
    fi
done
# convert txt to clm (call model internal function txt2clm) - replace with desired name for clm file
../bin/txt2clm -float -ncell 200 -nstep 1 -nbands 1 -firstyear 1981 logging_input.txt logging_50yr_dbh0.35.clm

