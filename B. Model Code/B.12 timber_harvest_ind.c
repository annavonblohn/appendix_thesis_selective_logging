
#include "lpj.h"
#include "tree.h"

Stocks timber_harvest_ind(Pft *pft,      /**< Pointer to tree PFT */
                      Soil *soil,      /**< Litter pool */
                      Poolpar f,
                      Stocks *trad_biofuel,
                      const Config *config
                    )              /** \return harvested carbon (gC/m2) */
{
  int i,npatch;
  const Pfttree *tree;
  const Pfttreepar *treepar;
  Output *output;
  Stocks harvest={0,0}; // Initialize harvest structure with zero carbon, nitrogen
  Real biofuel;
  Real standfrac;
// Assigning variables
  tree=pft->data; // Pointer to tree-specific data of pft
  treepar=pft->par->data; // Pointer to tree-specific parameter of pft
  output=&pft->patch->stand->cell->output; // Pointer to output structure
  standfrac=pft->patch->stand->frac; // Fraction of stand occupied by the pft
  npatch=pft->patch->stand->npatch; // Number of patches in stand

// Calculate carbon & nitrogen harvested from the tree
// Multiply carbon and nitrogen values of heartwood and sapwood by number of individuals and stand fraction
  /* Transfer wood to product pools, assume 2/3 of sapwood to be above-ground */
  harvest.carbon=(tree->ind.heartwood.carbon+tree->ind.sapwood.carbon)*
                 pft->nind*standfrac;
  harvest.nitrogen=(tree->ind.heartwood.nitrogen+tree->ind.sapwood.nitrogen)*
                 pft->nind*standfrac;
// Reset carbon & nitrogen values of trad_biofuel structure
  trad_biofuel->carbon=trad_biofuel->nitrogen=0;
  biofuel=0;
// Calculate contribution of harvested carbon & nitrogen to fast & slow product pools
  pft->patch->stand->cell->ml.product.fast.nitrogen+=harvest.nitrogen*f.fast/npatch;
  pft->patch->stand->cell->ml.product.slow.nitrogen+=harvest.nitrogen*f.slow/npatch;
  pft->patch->stand->cell->ml.product.fast.carbon+=harvest.carbon*f.fast/npatch;
  pft->patch->stand->cell->ml.product.slow.carbon+=harvest.carbon*f.slow/npatch;
// Update carbon & nitrogen values in soil dast pool based on biofuel fraction and stand fraction
  soil->pool[0].fast.carbon+=harvest.carbon*biofuel*0.1/standfrac;
  soil->pool[0].fast.nitrogen+=harvest.nitrogen*biofuel*0.1/standfrac;
  /* Transfer non-harvested wood, leaves, and roots of trees cut to litter */
  soil->litter.item[pft->litter].ag.leaf.carbon+=tree->ind.leaf.carbon*pft->nind;
  getoutput(output,LITFALLC,config)+=tree->ind.leaf.carbon*pft->nind*standfrac/npatch;
  soil->litter.item[pft->litter].ag.leaf.nitrogen+=tree->ind.leaf.nitrogen*pft->nind;
  getoutput(output,LITFALLN,config)+=tree->ind.leaf.nitrogen*pft->nind*standfrac/npatch;
  soil->litter.item[pft->litter].ag.leaf.nitrogen+=pft->bm_inc.nitrogen;
  getoutput(output,LITFALLN,config)+=pft->bm_inc.nitrogen*standfrac/npatch;
  // Transfer different wood fuel classes to litter
  for(i=0;i<NFUELCLASS;i++)
  {
    soil->litter.item[pft->litter].ag.wood[i].carbon+=(tree->ind.heartwood_bg.carbon+tree->ind.sapwood_bg.carbon-tree->ind.debt.carbon+tree->excess_carbon)*
                                         pft->nind*treepar->fuelfrac[i];
    getoutput(output,LITFALLC,config)+=(tree->ind.heartwood_bg.carbon+tree->ind.sapwood_bg.carbon-tree->ind.debt.carbon+tree->excess_carbon)*
                                         pft->nind*treepar->fuelfrac[i]*standfrac/npatch;
    getoutput(output,LITFALLC_WOOD,config)+=(tree->ind.heartwood_bg.carbon+tree->ind.sapwood_bg.carbon-tree->ind.debt.carbon+tree->excess_carbon)*

    soil->litter.item[pft->litter].ag.wood[i].nitrogen+=(tree->ind.heartwood_bg.nitrogen+tree->ind.sapwood_bg.nitrogen-tree->ind.debt.nitrogen)*
                                         pft->nind*treepar->fuelfrac[i];
    getoutput(output,LITFALLN,config)+=(tree->ind.heartwood_bg.nitrogen+tree->ind.sapwood_bg.nitrogen-tree->ind.debt.nitrogen)*
                                         pft->nind*treepar->fuelfrac[i]*standfrac/npatch;
    getoutput(output,LITFALLN_WOOD,config)+=(tree->ind.heartwood_bg.nitrogen+tree->ind.sapwood_bg.nitrogen-tree->ind.debt.nitrogen)*
                                         pft->nind*treepar->fuelfrac[i]*standfrac/npatch;
  }
// Transfer root carbon and nitrogen to litter
  soil->litter.item[pft->litter].bg.carbon+=tree->ind.root.carbon*pft->nind;
  getoutput(output,LITFALLC,config)+=tree->ind.root.carbon*pft->nind*standfrac/npatch;
  soil->litter.item[pft->litter].bg.nitrogen+=tree->ind.root.nitrogen*pft->nind;
  getoutput(output,LITFALLN,config)+=tree->ind.root.nitrogen*pft->nind*standfrac/npatch;
  return harvest; // Return harvested carbon & nitrogen
} /* of 'timber_harvest_ind' */
