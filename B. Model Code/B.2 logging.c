#include "lpj.h"

void logging(Stand *stand,const Config *config)
{
  Patch *patch;
  Pft *pft;
  Pfttree *tree;
  Stocks harvest;
  Stocks trad_biofuel;
  Poolpar frac;
  int np,p;
  /* fast and slow separation based on wood demand for pulpwood and particles (fast) and sawlog, veneer and others (slow) */
  /* remainder is burnt, if param.fburn is set to 1.0 */
  frac.fast=param.harvest_fast_frac; /* 76% of cut trees is harvested and 26% of harvested wood into fast pools, so 34% of harvested wood goes to fast pools */
  frac.slow=1-param.harvest_fast_frac; /* 50% */
  foreachpatch(patch,np,stand) // Loop over each patch in stand (grid cell)
    patch->nlogging=0; // islogging initially set to FALSE
  if(stand->cell->logging_dbh>=0)
  {
    foreachpatch(patch,np,stand) // Loop over each patch in stand
    {
      foreachpft(pft,p,&patch->pftlist) // Loop over each PFT in patch
      {
        if(istree(pft) && logging_tree(pft,stand->cell->logging_dbh,config->logging_wooddensity)) // check if PFT is tree and passes logging DBH treshold
        {
          tree=pft->data; // get pft tree data for tree pft
          patch->nlogging++; // nlogging incremented to monitor number of trees logged
#ifdef DEBUG
          fprinttreephys2carbon(stdout,tree->ind,pft->nind);
          printf("\n");
#endif
          harvest=timber_harvest_ind(pft,&patch->soil,frac,&trad_biofuel,config); // timber harvest calc and store result in 'harvest' variable
          getoutput(&stand->cell->output,VOL_LOGGING,config)+=harvest.carbon/tree->wooddens/param.patcharea/stand->npatch;
          getoutput(&stand->cell->output,TRAD_BIOFUEL,config)+=trad_biofuel.carbon/stand->npatch; // update output and balance variables with harvested biofuel data
          stand->cell->balance.trad_biofuel.carbon+=trad_biofuel.carbon/stand->npatch;
          stand->cell->balance.trad_biofuel.nitrogen+=trad_biofuel.nitrogen/stand->npatch;
          stand->cell->balance.timber_harvest.carbon+=harvest.carbon/stand->npatch;
          stand->cell->balance.timber_harvest.nitrogen+=harvest.nitrogen/stand->npatch;
          getoutput(&stand->cell->output,TIMBER_HARVESTC,config)+=harvest.carbon/stand->npatch;
          delpft(&patch->pftlist,p); // delete pft from patch's pft list
          p--; // decrement index to account for deleted pft
       }
     }
     getoutput(&stand->cell->output,NUM_LOGGING,config)+=patch->nlogging/param.patcharea/stand->npatch;
   }
 }
} 
