/**************************************************************************************/
/**                                                                                \n**/
/**      m  o  r  t  a  l  i  t  y  _  t  r  e  e  _  i  n  d  .  c                \n**/
/**                                                                                \n**/
/**     C implementation of LPJmL                                                  \n**/
/**                                                                                \n**/
/** (C) Potsdam Institute for Climate Impact Research (PIK), see COPYRIGHT file    \n**/
/** authors, and contributors see AUTHORS file                                     \n**/
/** This file is part of LPJmL and licensed under GNU AGPL Version 3               \n**/
/** or later. See LICENSE file or go to http://www.gnu.org/licenses/               \n**/
/** Contact: https://github.com/PIK-LPJmL/LPJmL                                    \n**/
/**                                                                                \n**/
/**************************************************************************************/

#include "lpj.h"
#include "tree.h"

//#define k_mort 0.5 //0.2      /* coefficient of growth efficiency in mortality equation */
#define ramp_gddtw 400.0      /* ramp for heat damage function. Above 200 growing degree days above the upper limit tw,
                                 establishment is zero and mortality 100%      */
#define BM_INC_COUNTER 1      /* year counter for bm_delta<=0*/
#define BM_INC_COUNTER_MAX 70 /* bm_inc_counter value where trees die immediately */
#define KMORTGREFF 0.3        /* value of mort_greff when growth efficiency below PFT-specific threshold */
#define KMORTBG_LNF -log(0.1) /* Thomas_base: -log(0.001); coefficient in calculation of background mortality (negated natural log of
                                 fraction of population expected to survive to age 'longevity'; see Eqn 14 below) */
#define weight 0.025
#define a 1.0
#define KMORTBG_Q 2.0         /* exponent in calculation of background mortality (shape parameter for relationship between mortality and age
                                 (0=constant mortality; 1=linear increase; >1->exponential; steepness increases for increasing positive values) */

#define stemdiam_max 1395.21
/*
 *
 *     Function mortality
 *
 *     Tree background and stress mortality
 *
 */
static Real mort_min(Real age,Real longevity)
{
  return min(1.0,KMORTBG_LNF*(KMORTBG_Q+1)/longevity*
                                        pow(age/longevity,KMORTBG_Q));
} /* of 'mort_min' */

Bool mortality_tree_ind(Pft *pft,          /**< Pointer to pft                      */
                        Real turnover_ind, /**< individual turnover                 */
                        Real mtemp_max,    /**< maximum temperature of month (deg C)*/
                        Bool isdaily       /**< daily temperature data (TRUE/FALSE) */
                       )                   /** \return TRUE if tree dies */
{
  Real mort,bm_delta,heatstress,nind_kill,mort_max;
  Real leafarea_real,leafarea_expected,sapwood_xs_area,sapwood_ratio;
  Real stemdiam;
  Real c1 = 0;
  Real c2 = 0;
  Real bminc_max;
  Real height_max;

  Pfttree *tree;
  Pfttreepar *treepar;
  tree=pft->data;


// test for bminc related to tree height
  if(tree->height>=15)
    bminc_max = 1000;
  else
    bminc_max=70;

// test: increase BMINC for the n highest trees
  height_max=getmaxheight(&pft->patch->pftlist,3);
  if(tree->height>=height_max)
    bminc_max = 1000;
  else
    bminc_max=70;

  treepar=pft->par->data;
  //if(tree->age>5 && tree->height<0.5)
  //  return TRUE;
  bm_delta=pft->bm_inc.carbon/pft->nind-turnover_ind;
  if (tree->age==1)
    tree->bm_inc_counter = 1;

  /* if(tree->age==1 && bm_delta<=0)
    return TRUE; */
  if(bm_delta<0)
  {
    bm_delta=0;
    tree->bm_inc_counter++;
  }
  else
    tree->bm_inc_counter = 1;
  if (pft->par->cultivation_type==BIOMASS)
    mort_max=0.005;
  else
    mort_max=pft->par->mort_max;

  //mort=(mort_max+(tree->bm_inc_counter/BM_INC_COUNTER_MAX))/(1+k_mort*bm_delta/tree->carbon.leaf/tree->sla);
  sapwood_xs_area = tree->sapwood_old/(tree->wooddens*tree->height);
  leafarea_real = tree->ind.leaf.carbon*pft->sla;
  leafarea_expected = treepar->k_latosa*sapwood_xs_area;
  //if(tree->sapwood_old>tree->carbon.sapwood)
  //mort=((tree->sapwood_old-tree->carbon.sapwood)/tree->sapwood_old)/100;

//if (leafarea_expected > leafarea_real)
  //mort+=(mort_max)/(1+k_mort*bm_delta/leafarea_expected);
//else

  //mort_max = pow(10,-2.66+0.255/((tree->wooddens*1)/1000000));
  mort_max = pow(10,treepar->wdmort_1+treepar->wdmort_2/((tree->wooddens*1)/1000000));
//mort_max=MORT_MAX;


  mort=(mort_max)/(1+param.k_mort*bm_delta/leafarea_real);


  c1 = 25;//scaling up relative soil moisture content (0,....1) to integer
  c2 = 20;//move curve to the right

  if(mort < 0)//ensure that mort is not negative after substraction
    mort = 0;

//if (tree->bm_inc_counter >= BM_INC_COUNTER_MAX)
  if (tree->bm_inc_counter >= bminc_max) // test by Sarah 25.1.23
    return TRUE;
  if(mtemp_max>pft->par->twmax)
  {
    heatstress=tree->gddtw/ramp_gddtw;
    if(heatstress>1)
      heatstress=1;
    mort+=heatstress;
  }
  mort+=mort_min(tree->age,treepar->longevity);

  //stemdiam=pow(tree->height/treepar->allom2,1.0/treepar->allom3);
  //mort+=mort_min(stemdiam*1000,stemdiam_max);

/**************************************************************************************/
// Changes for additional logging-induced mortality of trees in patch where nlogging > 0  and for trees > 0.3 m 
if(pft->patch->nlogging && stemdiam< 0.3) {
     mort+=param.logging_mort;
}
  if(erand48(pft->patch->stand->cell->seed)<mort)
    return TRUE;
  else {
       mort = mort;
       return isneg_tree(pft);
}
/**************************************************************************************/
