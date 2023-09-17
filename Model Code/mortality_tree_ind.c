// Previous calculation of individual mortality
if(pft->patch->nlogging && stemdiam< 0.3) {
     mort+=param.logging_mort;
}
  if(erand48(pft->patch->stand->cell->seed)<mort)
    return TRUE;
  else {
       mort = mort;
       return isneg_tree(pft);
}
