/**************************************************************************************/
/**                                                                                \n**/
/**       i  n  p  u  t  _  c  r  u  m  o  n  t  h  l  y  .  j  s                  \n**/
/**                                                                                \n**/
/** Configuration file for input dataset for LPJ C Version 5.3.001                 \n**/
/**                                                                                \n**/
/** (C) Potsdam Institute for Climate Impact Research (PIK), see COPYRIGHT file    \n**/
/** authors, and contributors see AUTHORS file                                     \n**/
/** This file is part of LPJmL and licensed under GNU AGPL Version 3               \n**/
/** or later. See LICENSE file or go to http://www.gnu.org/licenses/               \n**/
/** Contact: https://github.com/PIK-LPJmL/LPJmL                                    \n**/
/**                                                                                \n**/
/**************************************************************************************/

/* logging and co2 were adjusted for selective logging simulations */

"inpath" : "/p/projects/biodiversity/",

"soilmap" : [null,"clay", "silty clay", "sandy clay", "clay loam", "silty clay loam",
             "sandy clay loam", "loam", "silt loam", "sandy loam", "silt",
             "loamy sand", "sand", "rock and ice"],

"landusemap" : ["temperate cereals","rice", "maize", "tropical cereals", "pulses",
                "temperate roots", "tropical roots", "oil crops sunflower",
                "oil crops soybean", "oil crops groundnut", "oil crops rapeseed",
                "sugarcane","others","grassland","biomass grass","biomass tree"],

"fertilizermap" : ["temperate cereals","rice", "maize", "tropical cereals", "pulses",
                   "temperate roots", "tropical roots", "oil crops sunflower",
                   "oil crops soybean", "oil crops groundnut", "oil crops rapeseed",
                   "sugarcane","others","grassland","biomass grass","biomass tree"],

"cftmap" : ["temperate cereals","rice", "maize", "tropical cereals", "pulses",
            "temperate roots", "tropical roots", "oil crops sunflower",
            "oil crops soybean", "oil crops groundnut", "oil crops rapeseed",
            "sugarcane"],
"input" :
{
  "soil" :         { "fmt" : "raw", "name" : "input/soil_santarem.bin"},
  "coord" :        { "fmt" : "clm",  "name" : "input/grid_santarem.clm"},
  "soildepth" :    { "fmt" : "cdf",   "var" : "soild", "name" : "/p/projects/biodiversity/billing/input/soildepth/soil_sed_deposits_depth_Pelletier2016.nc"},
  "logging" :        { "fmt" : "clm",  "name" : "/home/annavo/lpjml56FIT/santarem/logging_single_dbh0.5.clm"},
  "countrycode" :  { "fmt" : "clm",  "name" : "input_VERSION2/cow_full_2018.bin"},
  "no3deposition" : { "fmt" : "clm",  "name" : "input_VERSION2/no3_deposition_rcp8p5.clm"},
  "nh4deposition" : { "fmt" : "clm",  "name" : "input_VERSION2/nh4_deposition_rcp8p5.clm"},
  "soilpH" :        { "fmt" : "clm",  "name" : "input_VERSION2/soil_ph.clm"},
  "extflow" :        { "fmt" : "cdf",  "var" : "txt","name" : "input_VERSION2/soil_ph.clm"},
  "landuse" :      { "fmt" : "clm",  "name" : "input_VERSION2/cft1700_2005_irrigation_systems_64bands.bin"},
  "fertilizer_nr" : { "fmt" :"clm",  "name" : "input_VERSION3/fertilizer_luh2v2_1900-2015_32bands.clm"},
  "manure_nr" :    { "fmt" : "clm", "name" : "input_VERSION3/manure_zhang17_1860-2014_32bands_clm2.clm"},
  "with_tillage" : { "fmt" : "clm", "name" : "input_VERSION3/lpj_tillage_CA_1973-2010.clm"},
  "residue_on_field" : { "fmt" : "clm", "name" : "/p/projects/lpjml/input/MADRAT/residues_madrat_1850-2015_16bands.clm"},
  "sdate" : {"fmt" : "clm", "name" : "/p/projects/landuse/users/cmueller/GGCMI/crop_calendar/GGCMI_CTWN_planting_v1.25.clm2"},
  "grassland_fixed_pft" : { "fmt" : "raw", "name" : "/home/rolinski/LPJ/Newinput/scenario_MO0.bin"},
  "grassland_fixed_pft" : { "fmt" : "raw", "name" : "/p/projects/landuse/users/rolinski/Newinput/scenario_MO0.bin"},
  "grass_harvest_options" : { "fmt" : "raw", "name": "/p/projects/landuse/users/rolinski/Newinput/scenario_MO2.bin"},
   "sowing_ag_tree_rf" :   { "fmt" : "cdf", "var" : "planting day", "name" : "/p/projects/landuse/users/cmueller/GGCMI/crop_calendar/Cotton_rf_growing_season_dates_v1.25.nc4"},
  "harvest_ag_tree_rf" :  { "fmt" : "cdf", "var" : "harvest day", "name" : "/p/projects/landuse/users/cmueller/GGCMI/crop_calendar/Cotton_rf_growing_season_dates_v1.25.nc4"},
  "sowing_ag_tree_ir" :   { "fmt" : "cdf", "var" : "planting day", "name" : "/p/projects/landuse/users/cmueller/GGCMI/crop_calendar/Cotton_ir_growing_season_dates_v1.25.nc4"},
  "harvest_ag_tree_ir" :  { "fmt" : "cdf", "var" : "harvest day", "name" : "/p/projects/landuse/users/cmueller/GGCMI/crop_calendar/Cotton_ir_growing_season_dates_v1.25.nc4"},
  "lakes" :        { "fmt" : "meta", "name" : "input_VERSION2/glwd_lakes_and_rivers.json"},
  "drainage" :     { "fmt" : "clm",  "name" : "input_VERSION2/drainagestn.bin"},
  "neighb_irrig" : { "fmt" : "clm",  "name" : "input_VERSION2/neighb_irrig_stn.bin"},
  "elevation" :    { "fmt" : "clm",  "name" : "input_VERSION2/elevation.bin"},
  "track" :        { "fmt" : "clm",  "name" : "/p/projects/biodiversity/bloh/utrack/track.clm"},
  "reservoir" :    { "fmt" : "clm",  "name" : "input_VERSION2/reservoir_info_grand5.bin"},
  "temp" :         { "fmt" : "clm",  "name" : "input/CRU_new/tmp_1901-2014_santarem.clm"},
  "prec" :         { "fmt" : "clm",  "name" : "input/CRU_new/pr_1901-2013_santarem.clm"},
  "lwnet" :         { "fmt" : "clm",  "name" : "input/CRU_new/lwnet_1901-2011_santarem.clm"},
  "swdown" :         { "fmt" : "clm",  "name" : "input/CRU_new/swdown_1901-2011_santarem.clm"},
  "cloud":         { "fmt" : "clm",  "name" : "CRUDATA_TS3_23/cru_ts3.23.1901.2014.cld.dat.clm"},
  "wind":          { "fmt" : "clm",  "name" : "input_VERSION2/mwindspeed_1860-2100_67420.clm"},
  "tamp":          { "fmt" : "clm",  "name" : "CRUDATA_TS3_23/cru_ts3.23.1901.2014.dtr.dat.clm"}, /* diurnal temp. range */
  "lightning" :    { "fmt" : "clm",  "name" : "input_VERSION2/mlightning.clm"},
  "human_ignition": { "fmt" : "clm", "name" : "input_VERSION2/human_ignition.clm"},
  "popdens" :      { "fmt" : "clm",  "name" : "input_VERSION2/popdens_HYDE3_1901_2011_bi.clm"},
  "burntarea" :    { "fmt" : "clm",  "name" : "/data/biosx/mforkel/input_new/GFED_CNFDB_ALFDB_Interp.BA.360.720.1901.2012.30days.clm"},
  "landcover":     { "fmt" : "clm",  "name" : "/data/biosx/mforkel/input_new/landcover_synmap_koeppen_vcf_newPFT_forLPJ_20130910.clm"},
  "co2" :          { "fmt" : "txt",  "name" : "/p/projects/biodiversity/annavo/climate_input/co2_const_1981_2011_364ppm.dat"},/* average from 1981 - 2011 */
  "wetdays" :      { "fmt" : "clm",  "name" : "input/CRU_new/wet_santarem_1901-2013.clm"},
  "wateruse" :     { "fmt" : "clm",  "name" : "input_VERSION2/wateruse_1900_2000.bin" }
},
