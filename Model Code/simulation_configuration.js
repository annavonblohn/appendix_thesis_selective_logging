
/**  I.   Simulation description and type section                                  \n**/
/**  II.  Input parameter section                                                  \n**/
/**  III. Input data section                                                       \n**/
/**  IV.  Output data section                                                      \n**/
/**  V.   Run settings section                                                     \n**/
/**                                                                                \n**/
/** (C) Potsdam Institute for Climate Impact Research (PIK), see COPYRIGHT file    \n**/
/** authors, and contributors see AUTHORS file                                     \n**/
/** This file is part of LPJmL and licensed under GNU AGPL Version 3               \n**/
/** or later. See LICENSE file or go to http://www.gnu.org/licenses/               \n**/
/** Contact: https://github.com/PIK-LPJmL/LPJmL                                    \n**/
/**                                                                                \n**/
/**************************************************************************************/

{   /* LPJmL-FIT configuration in JSON format */

/*===================================================================*/
/*  I. Simulation description and type section                       */
/*===================================================================*/

  "sim_name" : "LPJmL Run", /* Simulation description */
  "sim_id"   : "lpjml",     /* LPJML Simulation type with managed land use */
  "version"  : "5.6",       /* LPJmL-FIT version expected */
  "coupled_model": null,
  "individual" : true,
  "npatch" : 4,
  "isD95max" : true,
  "root_model": "logistic",  /* root growth model (linear, logistic, none) */
  "cut_year": -9999,     /* year where all trees are logged */
  "tree_year": -1,       /* year when trees can establish again after cut_year*/
  "random_prec" : true,     /* Random weather generator for precipitation enabled */
  "random_seed" : 2,        /* seed for random number generator */
  "radiation" : "radiation", /* other options: "cloudiness", "radiation", "radiation_swonly", "radiation_lwdown" */
  "fire" : "no_fire",          /* fire disturbance deactivated, other options: NO_FIRE, FIRE, SPITFIRE, SPITFIRE_TMAX (for GLDAS input data) */
  "fire_on_grassland" : false, /* enable fire on grassland for Spitfire */
  "fdi" : "nesterov",       /* different fire danger index formulations: "wvpd" (needs GLDAS input data), "nesterov" */
  "firewood" : false,
  "new_phenology" : true,   /* GSI phenology enabled */
  "new_trf" : false,        /* new transpiration reduction function disabled */
  "river_routing" : false,
  "extflow" : false,
  "permafrost" : true,
  "johansen" : true,
  "logging_wooddensity": {"low": 2.2e5, "high": 3.1e5}, /* WD range for trees subjected to selective logging: 0.5 - 0.7 g/cm³ */
  "soilpar_option" : "no_fixed_soilpar", /* other options "no_fixed_soilpar", "fixed_soilpar", "prescribed_soilpar" */
  "with_nitrogen" : "no", /*no nutrient limitation through nitrogen, other options: "no", "lim", "unlim" */
  "store_climate" : true, /* store climate data in spin-up phase */
  "const_climate" : false,
  "shuffle_climate" : true, /* shuffle spinup climate */
  "const_deposition" : false,
  "depos_year_const" : 1901,
  "fix_climate" : true,
  "fix_climate_year" : 1996, /* repeated climate cycle = fix_climate_year +- fix_climate_cycle/2 */
  "fix_climate_cycle" : 30, /* climate cycle 1981 - 2011 */
  "fix_landuse" : false,
#ifdef FROM_RESTART
  "logging" : true, /* selective logging enabled */
  "new_seed" : false, /* read random seed from restart file */
  "population" : false,
  "landuse" : "no", /* other options: "no", "yes", "const", "all_crops", "only_crops" */
  "landuse_year_const" : 2000, /* set landuse year for "const" case */
  "reservoir" : true,
  "wateruse" : "no",  /* other options: "no", "yes", "all" */
  "equilsoil" : false,
  "inheritance" : false, /* inheritance for new saplings deactivated */


    /*===================================================================*/
/*  II. Input parameter section                                      */
/*===================================================================*/

#include "param_indiv.js"    /* Input parameter file */

/*===================================================================*/
/*  III. Input data section                                          */
/*===================================================================*/

#include "simulation_input.js"    /* Input files of CRU dataset */

  
/*===================================================================*/
/*  IV. Output data section                                          */
/*===================================================================*/
/* Selection of defined output files */
  
   { "id" : "timber_harvestc",  "file" : { "fmt" : "cdf", "name" : "output/timber_harvestc.nc"}}, /* newly added logging output */
    { "id" : "num_logging",      "file" : { "fmt" : "cdf", "name" : "output/num_logging.nc"}}, /* newly added logging output */
    { "id" : "vol_logging",      "file" : { "fmt" : "cdf", "name" : "output/vol_logging.nc"}}, /* newly added logging output */
    { "id" : "litc",             "file" : { "fmt" : "cdf", "name" : "output/litc.nc"}},
    { "id" : "sla_mass",         "file" : { "fmt" : "cdf", "name" : "output/sla_mass.nc"}},
    { "id" : "longevity_mass",   "file" : { "fmt" : "cdf", "name" : "output/longevity_mass.nc"}},
    { "id" : "age_mass",         "file" : { "fmt" : "cdf", "name" : "output/age_mass.nc"}},
    { "id" : "height_mass",      "file" : { "fmt" : "cdf", "name" : "output/height_mass.nc"}},
    { "id" : "wooddens_mass",    "file" : { "fmt" : "cdf", "name" : "output/wooddens_mass.nc"}},
    { "id" : "sla_ind",          "file" : { "fmt" : "cdf", "name" : "output/sla_ind.nc"}},
    { "id" : "longevity_ind",    "file" : { "fmt" : "cdf", "name" : "output/longevity_ind.nc"}},
    { "id" : "age_ind",          "file" : { "fmt" : "cdf", "name" : "output/age_ind.nc"}},
    { "id" : "height_ind",       "file" : { "fmt" : "cdf", "name" : "output/height_ind.nc"}},
    { "id" : "wooddens_ind",     "file" : { "fmt" : "cdf", "name" : "output/wooddens_ind.nc"}},
    { "id" : "perc",             "file" : { "fmt" : "cdf", "name" : "output/mperc.nc"}},
    { "id" : "agb",              "file" : { "fmt" : "cdf", "name" : "output/agb.nc"}},
    { "id" : "agb_tree",         "file" : { "fmt" : "cdf", "name" : "output/agb_tree.nc"}},


  
/*===================================================================*/
/*  V. Run settings section                                          */
/*===================================================================*/

  "startgrid" : "all", 
  "endgrid" : "all", 
#ifdef CHECKPOINT
  "checkpoint_filename" : "restart/restart_checkpoint.lpj", /* filename of checkpoint file */
#endif

#ifndef FROM_RESTART

  "nspinup" : 500,  /* spinup years */
  "nspinyear" : 30,  /* cycle length during spinup (yr) */
  "firstyear": 1981, /* first year of simulation */
  "lastyear" : 1981, /* last year of simulation */
  "restart" :  false, /* start from restart file */
  "outputyear" : -8099,
  "write_restart" : true, /* create restart file: the last year of simulation=restart-year */
  "write_restart_filename" : "restart/restart_1980_nv_stdfire.lpj", /* filename of restart file */
  "restart_year": 1980 /* write restart at year */

#else

  "nspinup" : 0,   /* spinup years */
  "nspinyear" : 30,  /* cycle length during spinup (yr)*/
  "firstyear": 1981, /* first year of simulation */
  "lastyear" : 2311, /* last year of simulation */
  "outputyear": 1981, /* first year output is written  */
  "restart" :  true, /* start from restart file */
  "restart_filename" : "restart/restart_1980_nv_stdfire.lpj", /* filename of restart file */
  "write_restart" : true, /* create restart file */
  "write_restart_filename" : "restart/restart_2311_nv_stdfire.lpj", /* filename of restart file */
  "restart_year": 2311 /* write restart at year */

#endif
}


