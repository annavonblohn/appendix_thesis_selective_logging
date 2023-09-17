// Include necessary header files
#include "lpj.h"
#include "tree.h"

// Define function logging_tree, input pointer to Pft and Real dbh
Bool logging_tree(const Pft *pft,Real dbh,Limit wooddensity)
{
// Declare necessary variables
  Real stemdiam;
  Bool islog;
  Pfttree *tree;
  Pfttreepar *treepar;
// Assign values to pointers using data field of Pft an Pftpar structures
  tree=pft->data;
  treepar=pft->par->data;
// Calculate stem diameter = (height/allom2) ^(1/allom3)
  stemdiam=pow(tree->height/treepar->allom2,1.0/treepar->allom3);
// If stem diam > provided dbh set islog true, if <= set islog false
  if(stemdiam>dbh && tree->wooddens>=wooddensity.low && tree->wooddens<=wooddensity.high)
  {
#ifdef DEBUG
    printf("height=%g,stem=%g>%g\n",tree->height,stemdiam,dbh);
#endif
    islog=TRUE;
  }
  else
    islog=FALSE;
// Return boolean islog
  return islog;
}

