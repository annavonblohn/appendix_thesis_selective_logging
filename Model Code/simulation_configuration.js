
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

  

