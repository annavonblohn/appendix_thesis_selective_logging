/**************************************************************************************/
/**                                                                                \n**/
/**              l  p  j  p  a  r  a  m  _  n  o  n  .  j  s                       \n**/
/**                                                                                \n**/
/**     LPJ parameter file for LPJmL version 5.6.004 without nitrogen              \n**/
/**                                                                                \n**/
/** (C) Potsdam Institute for Climate Impact Research (PIK), see COPYRIGHT file    \n**/
/** authors, and contributors see AUTHORS file                                     \n**/
/** This file is part of LPJmL and licensed under GNU AGPL Version 3               \n**/
/** or later. See LICENSE file or go to http://www.gnu.org/licenses/               \n**/
/** Contact: https://github.com/PIK-LPJmL/LPJmL                                    \n**/
/**                                                                                \n**/
/**************************************************************************************/

"param" :
{
  "patcharea" : 100.0,       /* patch area (m2) */
  "n_max":   100,            /* needed for sorting tree list in inheritance function if run with fpc_max or agb_max, nr. of trees selected from the list (e.g. first 100) */
  "k_lambert" : 0.5,         /* Lambert-Beer constant */
  "k_litter10" : 0.3,        /* k_litter10  (1/yr) */
  "k_soil10" : { "fast" : 0.03, "slow":  0.001}, /* fast, slow k_soil10  (1/yr) */
  "maxsnowpack": 20000.0,    /* max. snow pack (mm) */
  "soildepth_evap" : 300.0,  /* depth of sublayer at top of upper soil layer (mm) */
  "soil_infil" : 2.0,        /* default soil infiltration */
  "soil_infil_litter" : 2.0, /* soil infiltration intensification by litter cover*/
  "co2_p" : 278.0,           /* pre-industrial CO2 (ppmv) */
  "k" : 0.0548,              /* k    k = 7.4e-7 * atomic_mass_C / atomic_mass_N * seconds_per_day = 0.0548 Sprugel et al. 1996, Eqn 7*/
  "theta" : 0.7,             /* theta */
  "alphac3" : 0.08,          /* alphac3 */
  "alphac4" : 0.053,         /* alphac4 */
  "r_growth" : 0.25,         /* r_growth */
  "GM" : 3.26,               /* GM empirical parameter in demand function */
  "ALPHAM" : 1.391,          /* ALPHAM Priestley-Taylor coefficient*/
  "ko25" : 3.0e4,            /* Michaelis constant for O2 (Pa) at 25 deg C */
  "kc25" : 30.0,              /* Michaelis constant for CO2 (Pa) at 25 deg C */
  "atmfrac" : 0.7,           /* atmfrac */
  "fastfrac" : 0.98,         /* fastfrac */
  "bioturbate" : 0.5,        /* bioturbation (0 = no bioturbation) */
  "veg_equil_year" : 300,    /* number of years to get vegetation into equilibrium (before forst call of equisoil) */
  "veg_equil_unlim" : false, /* enable vegetation spinup without nitrogen limitation */
  "nequilsoil" : 160,        /* number of equisoil calls */
  "equisoil_interval" : 15,  /* time interval between equisoil calls */
  "equisoil_years": 10,      /* number of years used in calculation for equisoil */
  "equisoil_fadeout": 300,   /* number of years for equisoil fadeout (for final call of equisoil); set to zero for no fadeout  */
  "temp_response" : 46.02,   /* Parameter in temperature response function */
  "percthres" : 1.0,
  "fpc_tree_max" : 0.95,     /* maximum foliage projective cover for trees */
  "k_mort" : 0.2,            /* coefficient of growth efficiency in mortality equation (k_mort2) */
  "logging_mort" : 0.04,     /* additional logging mortality */
