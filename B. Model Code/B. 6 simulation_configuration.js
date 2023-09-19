/**************************************************************************************/
/**                                                                                \n**/
/**                   l  p  j  m  l  .  j  s                                       \n**/
/**                                                                                \n**/
/** Default configuration file for LPJmL C Version 5.3.001                         \n**/
/**                                                                                \n**/
/** Configuration file is divided into five sections:                              \n**/
/**                                                                                \n**/
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

/* Changes for Selective Logging Simulations are marked with ==== */

//#define DAILY_OUTPUT  /* enables daily output */

{   /* LPJmL configuration in JSON format */

/*===================================================================*/
/*  I. Simulation description and type section                       */
/*===================================================================*/

  "sim_name" : "LPJmL Run", /* Simulation description */
  "sim_id"   : "lpjml",     /* LPJML Simulation type with managed land use */
  "version"  : "5.6",       /* LPJmL version expected */
  "coupled_model": null,
  "individual" : true,
  /*===================================================================*/
  "npatch" : 4,  /* number of patches per grid cell = npatch * (endgrid - startgrid) */
  /*===================================================================*/
  "isD95max" : true,
  "root_model": "logistic",  /* root growth model (linear, logistic, none) */
  "cut_year": -9999,     /* year where all trees are logged, starting from bare ground */
  "tree_year": -1,       /* year when trees can establish again after cut_year*/
  "random_prec" : true,     /* Random weather generator for precipitation enabled */
  "random_seed" : 2,        /* seed for random number generator */
  "radiation" : "radiation",/* other options: "cloudiness", "radiation", "radiation_swonly", "radiation_lwdown" */
  "fire" : "no_fire",          /* fire disturbance enabled, other options: NO_FIRE, FIRE, SPITFIRE, SPITFIRE_TMAX (for GLDAS input data) */
  "fire_on_grassland" : false, /* enable fire on grassland for Spitfire */
  "fdi" : "nesterov",       /* different fire danger index formulations: "wvpd" (needs GLDAS input data), "nesterov" */
  "firewood" : false,
  "new_phenology" : true,   /* GSI phenology enabled */
  "new_trf" : false,        /* new transpiration reduction function disabled */
  "river_routing" : false,
  "extflow" : false,
  "permafrost" : true,
  "johansen" : true,
  /*===================================================================*/
  /* Model calculates WD as gC/cm³, requiring scaling with factor (10 ** -6) / 0.455 to determine WD as g/cm³ */
  "logging_wooddensity": {"low": 2.2e5, "high": 3.1e5}, /* WD range for trees subjected to selective logging 0.5 - 0.7 g/cm³ */
  /*===================================================================*/
  "soilpar_option" : "no_fixed_soilpar", /* other options "no_fixed_soilpar", "fixed_soilpar", "prescribed_soilpar" */
  "with_nitrogen" : "no", /* other options: "no", "lim", "unlim" */
  "store_climate" : true, /* store climate data in spin-up phase */
  "const_climate" : false,
  "shuffle_climate" : true, /* shuffle spinup climate */
  "const_deposition" : false,
  "depos_year_const" : 1901,
  /*===================================================================*/
  "fix_climate" : true,
  "fix_climate_year" : 1996, /* repeated climate cycle = fix_climate_year +- fix_climate_cycle/2 */
  "fix_climate_cycle" : 30, /* climate cycle 1981 - 2011 */
  /*===================================================================*/
  "fix_landuse" : false,
#ifdef FROM_RESTART
  /*===================================================================*/
  "logging" : true, /* logging module enabled */
  /*===================================================================*/
  "new_seed" : false, /* read random seed from restart file */
  "population" : false,
  "landuse" : "no", /* other options: "no", "yes", "const", "all_crops", "only_crops" */
  "landuse_year_const" : 2000, /* set landuse year for "const" case */
  "reservoir" : true,
  "wateruse" : "no",  /* other options: "no", "yes", "all" */
  "equilsoil" : false,
  "inheritance" : false,
#else
  "inheritance" : false,
  "logging" : false,
  "equilsoil" : false,
  "population" : false,
  "landuse" : "no",
  "reservoir" : false,
  "wateruse" : "no",
#endif
  "istrack" : false,
  "prescribe_burntarea" : false,
  "prescribe_landcover" : "no_landcover", /* NO_LANDCOVER, LANDCOVERFPC, LANDCOVEREST */
  "sowing_date_option" : "fixed_sdate",   /* NO_FIXED_SDATE, FIXED_SDATE, PRESCRIBED_SDATE */
  "sdate_fixyear" : 1970,               /* year in which sowing dates shall be fixed */
  "intercrop" : false,                  /* intercrops on setaside */
  "residue_treatment" : "fixed_residue_remove", /* residue options: READ_RESIDUE_DATA, NO_RESIDUE_REMOVE, FIXED_RESIDUE_REMOVE (uses param residues_in_soil) */
  "residues_fire" : false,              /* fire in residuals */
  "irrigation" : "lim",                 /* other options: "no", "lim", "pot", "all" */
  "laimax_interpolate" : "laimax_par",  /* laimax values from manage parameter file, */
                                        /* other options: LAIMAX_CFT, CONST_LAI_MAX, LAIMAX_INTERPOLATE */
  "tillage_type" : "all",               /* Options: "all" (all agr. cells tilled), "no" (no cells tilled) and "read" (tillage dataset used) */
  "till_startyear" : 1850,              /* year in which tillage should start */
  "black_fallow" : false,               /* simulation with black fallow on PNV */
  "pft_residue" : "temperate cereals",
  "no_ndeposition" : false,             /* turn off atmospheric N deposition */
  "rw_manage" : false,                  /* rain water management */
  "laimax" : 5,                         /* maximum LAI for CONST_LAI_MAX */
  "fertilizer_input" : "yes",           /* enable fertilizer input, other options: "no", "yes", "auto" */
  "manure_input" : true,                /* enable manure input */
  "fix_fertilization" : false,          /* fix fertilizer input */
  "others_to_crop" : true,              /* move PFT type others into PFT crop, cft_tropic for tropical,  cft_temp for temperate */
  "grazing" : "default",                /* default grazing type, other options : "default", "mowing", "ext", "int", "none" */
  "grazing_others" : "default",         /* default grazing type for others, other options : "default", "mowing", "ext", "int", "none" */
  "cft_temp" : "temperate cereals",
  "cft_tropic" : "maize",
  "grassonly" : false,                  /* set all cropland including others to zero but keep managed grasslands */
  "istimber" : true,
  "grassland_fixed_pft" : false,
  "grass_harvest_options" : false,
  "mowing_days" : [152, 335],          /* Mowing days for grassland if grass harvest options are ser */
  "crop_resp_fix" : false,             /* variable C:N ratio for crop respiration */
                                       /* for MAgPIE runs, turn off dynamic C:N ratio dependent respiration,
                                          which reduces yields at high N inputs */
  "crop_phu_option" : "new",
  "cropsheatfrost" : false,
  "double_harvest" : true,
  "ma_bnf" : true,

/*===================================================================*/
/*  II. Input parameter section                                      */
/*===================================================================*/
    
#include "soil.js" /* soil parameter Ü
#include "pft_non.jS" /* PFT-specific parameter with nitroge */
#include "param.js"    /* Input parameter file */

/*===================================================================*/
/*  III. Input data section                                          */
/*===================================================================*/

#include "simulation_input.js"    /* Input files of CRU dataset */

/*===================================================================*/
/*  IV. Output data section                                          */
/*===================================================================*/

#ifdef WITH_GRIDBASED
  "grid_scaled" : true, /* PFT-specific outputs scaled by stand->frac */
#define SUFFIX grid.bin
#else
  "grid_scaled" : false,
#define SUFFIX pft.bin
#endif

  "output_metafile" : true, /* no json metafile created */
  "float_grid" : false,      /* set datatype of grid file to float (TRUE/FALSE) */

#define mkstr(s) xstr(s) /* putting string in quotation marks */
#define xstr(s) #s

  "crop_index" : "temperate cereals", /* CFT for daily output */
  "crop_irrigation" : false,          /* irrigation flag for daily output */

#ifdef FROM_RESTART

  "output" :
  [

/*
ID                               Fmt                        filename
-------------------------------- ------------------------- ----------------------------- */
    { "id" : "grid",             "file" : { "fmt" : "raw", "name" : "output/grid.bin" }},
    { "id" : "ind",              "file" : { "fmt" : "txt", "name" : "output/ind.csv" }},
    { "id" : "fpc",              "file" : { "fmt" : "cdf", "name" : "output/fpc.nc" }},
    { "id" : "fpc_pft",          "file" : { "fmt" : "cdf", "name" : "output/fpc_pft.nc" }},
    { "id" : "npp",              "file" : { "fmt" : "cdf", "name" : "output/mnpp.nc"}},
    { "id" : "gpp",              "file" : { "fmt" : "cdf", "name" : "output/mgpp.nc"}},
    { "id" : "rh",               "file" : { "fmt" : "cdf", "name" : "output/mrh.nc"}},
    { "id" : "fapar",            "file" : { "fmt" : "cdf", "name" : "output/mfapar.nc"}},
    { "id" : "transp",           "file" : { "fmt" : "cdf", "name" : "output/mtransp.nc"}},
    { "id" : "runoff",           "file" : { "fmt" : "cdf", "name" : "output/mrunoff.nc"}},
    { "id" : "evap",             "file" : { "fmt" : "cdf", "name" : "output/mevap.nc"}},
    { "id" : "interc",           "file" : { "fmt" : "cdf", "name" : "output/minterc.nc"}},
    { "id" : "swc",              "file" : { "fmt" : "cdf", "name" : "output/mswc.nc"}},
    { "id" : "firef",            "file" : { "fmt" : "cdf", "name" : "output/firef.nc"}},
    { "id" : "vegc",             "file" : { "fmt" : "cdf", "name" : "output/vegc.nc"}},
    { "id" : "soilc",            "file" : { "fmt" : "cdf", "name" : "output/soilc.nc"}},
    /*===================================================================*/

    { "id" : "timber_harvestc",  "file" : { "fmt" : "cdf", "name" : "output/timber_harvestc.nc"}},
    { "id" : "num_logging",      "file" : { "fmt" : "cdf", "name" : "output/num_logging.nc"}},
    { "id" : "vol_logging",      "file" : { "fmt" : "cdf", "name" : "output/vol_logging.nc"}},
    
    /*===================================================================*/
    { "id" : "litc",             "file" : { "fmt" : "cdf", "name" : "output/litc.nc"}},
    { "id" : "flux_estabc",      "file" : { "fmt" : "cdf", "name" : "output/flux_estab.nc"}},
    { "id" : "pft_vegc",         "file" : { "fmt" : "cdf", "name" : "output/pft_vegc.nc"}},
    { "id" : "phen_tmin",        "file" : { "fmt" : "cdf", "name" : "output/mphen_tmin.nc"}},
    { "id" : "phen_tmax",        "file" : { "fmt" : "cdf", "name" : "output/mphen_tmax.nc"}},
    { "id" : "phen_light",       "file" : { "fmt" : "cdf", "name" : "output/mphen_light.nc"}},
    { "id" : "phen_water",       "file" : { "fmt" : "cdf", "name" : "output/mphen_water.nc"}},
    { "id" : "sla_mass",         "file" : { "fmt" : "cdf", "name" : "output/sla_mass.nc"}},
    { "id" : "lai_mass",         "file" : { "fmt" : "cdf", "name" : "output/lai_mass.nc"}},
    { "id" : "longevity_mass",   "file" : { "fmt" : "cdf", "name" : "output/longevity_mass.nc"}},
    { "id" : "age_mass",         "file" : { "fmt" : "cdf", "name" : "output/age_mass.nc"}},
    { "id" : "D95_mass",         "file" : { "fmt" : "cdf", "name" : "output/D95_mass.nc"}},
    { "id" : "D95max_mass",      "file" : { "fmt" : "cdf", "name" : "output/D95max_mass.nc"}},
    { "id" : "height_mass",      "file" : { "fmt" : "cdf", "name" : "output/height_mass.nc"}},
    { "id" : "wooddens_mass",    "file" : { "fmt" : "cdf", "name" : "output/wooddens_mass.nc"}},
    { "id" : "sla_ind",          "file" : { "fmt" : "cdf", "name" : "output/sla_ind.nc"}},
    { "id" : "lai_ind",          "file" : { "fmt" : "cdf", "name" : "output/lai_ind.nc"}},
    { "id" : "longevity_ind",    "file" : { "fmt" : "cdf", "name" : "output/longevity_ind.nc"}},
    { "id" : "age_ind",          "file" : { "fmt" : "cdf", "name" : "output/age_ind.nc"}},
    { "id" : "D95_ind",          "file" : { "fmt" : "cdf", "name" : "output/D95_ind.nc"}},
    { "id" : "D95max_ind",       "file" : { "fmt" : "cdf", "name" : "output/D95max_ind.nc"}},
    { "id" : "height_ind",       "file" : { "fmt" : "cdf", "name" : "output/height_ind.nc"}},
    { "id" : "wooddens_ind",     "file" : { "fmt" : "cdf", "name" : "output/wooddens_ind.nc"}},
    { "id" : "minwscal_ind",     "file" : { "fmt" : "cdf", "name" : "output/minwscal_ind.nc"}},
    { "id" : "pft_cleaf",        "file" : { "fmt" : "cdf", "name" : "output/pft_cleaf.nc"}},
    { "id" : "pft_nleaf",        "file" : { "fmt" : "cdf", "name" : "output/pft_nleaf.nc"}},
    { "id" : "pft_laimax",       "file" : { "fmt" : "cdf", "name" : "output/pft_laimax.nc"}},
    { "id" : "pft_lai",          "file" : { "fmt" : "cdf", "name" : "output/pft_lai.nc"}},
    { "id" : "pft_croot",        "file" : { "fmt" : "cdf", "name" : "output/pft_croot.nc"}},
    { "id" : "pft_nroot",        "file" : { "fmt" : "cdf", "name" : "output/pft_nroot.nc"}},
    { "id" : "pft_csapw",        "file" : { "fmt" : "cdf", "name" : "output/pft_csapw.nc"}},
    { "id" : "pft_nsapw",        "file" : { "fmt" : "cdf", "name" : "output/pft_nsapw.nc"}},
#ifdef WITH_SPITFIRE
    { "id" : "firec",            "file" : { "fmt" : "cdf", "timestep" : "monthly" , "unit" : "gC/m2/month", "name" : "output/mfirec.nc"}},
    { "id" : "nfire",            "file" : { "fmt" : "cdf", "name" : "output/mnfire.nc"}},
    { "id" : "burntarea",        "file" : { "fmt" : "cdf", "name" : "output/mburnt_area.nc"}},
#else
    { "id" : "firec",            "file" : { "fmt" : "cdf", "name" : "output/firec.nc"}},
#endif
    { "id" : "discharge",        "file" : { "fmt" : "cdf", "name" : "output/mdischarge.nc"}},
    { "id" : "wateramount",      "file" : { "fmt" : "cdf", "name" : "output/mwateramount.nc"}},
    { "id" : "pet",              "file" : { "fmt" : "cdf", "name" : "output/mpet.nc"}},
    { "id" : "albedo",           "file" : { "fmt" : "cdf", "name" : "output/malbedo.nc"}},
    { "id" : "maxthaw_depth",    "file" : { "fmt" : "cdf", "name" : "output/maxthaw_depth.nc"}},
    { "id" : "perc",             "file" : { "fmt" : "cdf", "name" : "output/mperc.nc"}},
    { "id" : "soilc_layer",      "file" : { "fmt" : "cdf", "name" : "output/soilc_layer.nc"}},
    { "id" : "agb",              "file" : { "fmt" : "cdf", "name" : "output/agb.nc"}},
    { "id" : "agb_tree",         "file" : { "fmt" : "cdf", "name" : "output/agb_tree.nc"}},
    { "id" : "return_flow_b",    "file" : { "fmt" : "cdf", "name" : "output/mreturn_flow_b.nc"}},
    { "id" : "transp_b",         "file" : { "fmt" : "cdf", "name" : "output/mtransp_b.nc"}},
    { "id" : "evap_b",           "file" : { "fmt" : "cdf", "name" : "output/mevap_b.nc"}},
    { "id" : "interc_b",         "file" : { "fmt" : "cdf", "name" : "output/mintec_b.nc"}}
/*------------------------------ ------------------------- ------------------------------- */
  ],

#else

  "output" :
  [
    { "id" : "globalflux",       "file" : { "fmt" : "txt", "scale" : 1e-9,"name" : "output/globalflux_spinup.csv"}}
  ],
#endif

/*===================================================================*/
/*  V. Run settings section                                          */
/*===================================================================*/

/*===================================================================*/
    
    /* maximum of 200 grid cells can be calculated parallel on high performance computer cluster
  calculating 200 grid cells with similar coordinates and 4 patches each results in 800 patches for one grid cell */
    
  "startgrid" : "all", /* maximum endgrid-startgrid = 200 */
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
  
/*===================================================================*/

#endif
}

