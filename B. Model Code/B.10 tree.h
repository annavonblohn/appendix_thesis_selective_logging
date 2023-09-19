/**************************************************************************************/
/**                                                                                \n**/
/**                        t  r  e  e  .  h                                        \n**/
/**                                                                                \n**/
/**     C implementation of LPJmL                                                  \n**/
/**                                                                                \n**/
/**     Header file for tree PFTs                                                  \n**/
/**                                                                                \n**/
/** (C) Potsdam Institute for Climate Impact Research (PIK), see COPYRIGHT file    \n**/
/** authors, and contributors see AUTHORS file                                     \n**/
/** This file is part of LPJmL and licensed under GNU AGPL Version 3               \n**/
/** or later. See LICENSE file or go to http://www.gnu.org/licenses/               \n**/
/** Contact: https://github.com/PIK-LPJmL/LPJmL                                    \n**/
/**                                                                                \n**/
/**************************************************************************************/

#ifndef TREE_H /* Already included? */
#define TREE_H

/* Definition of constants */

#define name_tree "tree"
#define reinickerp 1.6
//#define wooddens 2e5      /* wood density (gC/m3) */

/* Declaration of datatypes */

typedef struct
{
  Real leaf,sapwood,sapwood_bg,root;
} Treeratio;

typedef struct
{
  Stocks leaf,root;
} Treeturn;

typedef struct
{
  Real leaf,sapwood,sapwood_bg,root;
} Treephyspar;

typedef struct
{
  Stocks leaf,sapwood,sapwood_bg,root;
} Treephys;

typedef struct
{
  Stocks leaf,sapwood,heartwood,root,sapwood_bg,heartwood_bg,debt;
} Treephys2;

typedef struct
{
  int leaftype;                     /**< par16*/
  Treephyspar turnover;             /**< turnover rate (1/yr) (9,11,12)*/
  Treephyspar nc_ratio;             /**< N:C mass ratio (13-15) */
  Treeratio ratio;                  /**< C:N ratio relative to leaf ratio */
  Real crownarea_max;  /**< tree maximum crown area (m2) (20)*/
  Treephys2 sapl;                   /**< sapling */
  Real sapling_C;  /**< sapling C per (m2)*/
  Real allom1,allom2,allom3,allom4; /**< allometry */
Real aphen_min,aphen_max;
  Real height_max;                  /**< maximum height of tree (m) */
  Real reprod_cost;                 /**< reproduction cost */
  Real scorchheight_f_param;        /**< scorch height (F) */
  Real crownlength;                 /**< crown length (CL) */
  Real barkthick_par1;              /**< bark thickness par1 */
  Real barkthick_par2;              /**< bark thickness par2 */
  Real crown_mort_rck;              /**< crown damage (rCK) */
  Real crown_mort_p;                /**< crown damage (p) */
  Real fuelfrac[NFUELCLASS];        /**< Fuel fractions */
  Real k_est;                       /**< maximum overall sapling establishment rate (indiv/m2) */
  Real k_latosa;                    /**< leaf area to sapwood area */
  Real wood_sapl;
  int rotation;                     /**< coppicing interval from short rotation woody crops */
  int max_rotation_length;          /**< lifetime of short rotation woody crop plantation */
  Real harvest_ratio;               /**< fraction of biomass increment put into fruits */
  Real cnratio_fruit;               /**< C:N ration of fruits */
  Bool with_grass;                  /**< grass PFT allowed under agriculture tree? */
  Real P_init;                      /**< initial stand density (only used for wood plantations)*/
  Interval wooddens;                /**< wood density (gC/m2) */
  Real longevity;                   /**< tree longevity (yr) */
  Real alpha_r;                     /**< fpar-dependent sapling factor */
  Real wdmort_1;                    /**< intercept in wood density dependent mortality function */
  Real wdmort_2;                    /**< slope in wood density dependent mortality function */
  Interval D95max;
  int index;
} Pfttreepar;

typedef struct
{
  Real D95max;
  Real height;          /**< tree height (m) */
  Real boleht;          /**< bole height (m) */
  Real crownarea;       /**< crown area (m2) */
  Real barkthickness;   /**< bark thickness Kirsten */
  Real gddtw;
  Real aphen_raingreen;
  Real wooddens;        /**< wood density (gC/m3) */
  Real sapwood_old;
  Real leaf_old;
  Real anpp;            /**< annual NPP (gC/m2/yr) */
  Bool isphen;          /**< only used for summergreen trees*/
  Treeturn turn;
  Treeturn turn_litt;
  Treephys2 ind;
  Stocks fruit;
  Treephyspar falloc;
  Real turn_nbminc;     /**< storage for recovered nitrogen from turnover */
  Real excess_carbon;   /**< gC/ind; storage for carbon that cannot be allocated under given N limitation */
  Real nfertilizer;     /**< gN/m2; fertilier N to be applied in 2nd or additional doses */
  Real nmanure;         /**< gN/m2; manure N to be applied in 2nd or additional doses */
  int nfert_event       /**< count of N-fertilization events */;
  int boll_age;
  int bm_inc_counter;
  int age;
  int index;
} Pfttree;

struct sapling
{
Real sla;
  Real wooddens;        /* wood density (gC/m3) */
  Real longevity;       /* leaf longevity (yr) */
  Real minwscal;        /* water scalar value at which leaves shed by
                           drought deciduous PFT */
  Real beta_root;
  Real D95max;
  Real agb;
  Real fpc;
};

extern const char *leaftype[];

/* Declaration of functions */

extern void new_tree(Pft *,int,int,const Config *);
extern Pft *newpftage(Pftpar *,int);
extern Real npp_tree(Pft *,Real,Real,Real,int);
extern Bool mortality_tree(Litter *,Pft *,Real,Real,Bool,const Config *);
extern Bool mortality_tree_ind(Pft *,Real,Real,Bool);
extern Real fpc_tree(Pft *,Bool);
extern Real fpar_tree(const Pft *);
extern Real fpar_tree_ind(const Pft *);
extern Real alphaa_tree(const Pft *,int,int);
extern void litter_update_tree(Litter *, Pft *,Real,const Config *);
extern void litter_update_fire_tree(Litter *, Pft *,Real,const Config *);
extern void allometry_tree(Pft *pft);
extern Bool allocation_tree(Litter *,Pft *,Real *,const Config *);
extern Real lai_tree(const Pft *);
extern Real actual_lai_tree(const Pft *);
extern Stocks turnover_tree(Litter *,Pft *,const Config *);
extern void phenology_tree(Pft *,Real,int,Bool,const Config *);
extern Bool fwrite_tree(FILE *,const Pft *);
extern void fprint_tree(FILE *,const Pft *,int);
extern Bool fread_tree(FILE *,Pft *,Bool,Bool);
extern Bool fscanpft_tree(LPJfile *,Pftpar *,const Config *);
extern Bool isneg_tree(const Pft *);
extern Stocks establishment_tree(Pft *,Real,Real,int,Bool);
extern Stocks establishment_tree_ind(Pft *);
extern void init_tree(Pft *);
extern Stocks fire_tree(Pft *,Real *);
extern Stocks fire_tree_ind(Pft *,Real *);
extern Real vegc_sum_tree(const Pft *);
extern Real vegn_sum_tree(const Pft *);
extern Real agb_tree(const Pft *);
extern void mix_veg_tree(Pft *,Real);
extern void free_tree(Pft *);
extern void light_tree(Litter *,Pft *,Real,const Config *);
extern void adjust_tree(Litter *,Pft *,Real,Real,const Config *);
extern void reduce_tree(Litter *,Pft *,Real,const Config *);
extern void fprintpar_tree(FILE *,const Pftpar *,const Config *);
extern void output_daily_tree(const Pft *,const Config *);
extern Stocks livefuel_consum_tree(Litter *,Pft *,const Fuel *,Livefuel *, Bool *,Real,Real,const Config *);
extern Bool annual_tree(Patch *,Pft *,Real *,Bool,int,const Config *);
extern Stocks coppice_tree(Pft *,Bool);
extern void albedo_tree(Pft *,Real,Real);
extern void turnover_monthly_tree(Litter *,Pft *,const Config *);
extern void turnover_daily_tree(Litter *,Pft *,Real,int,Bool,const Config *);
extern Stocks harvest_tree(Pft *);
extern Real nuptake_tree(Pft *,Real *,Real *,int,int,const Config *);
extern Real ndemand_tree(const Pft *,Real *,Real,Real,Real);
extern Real vmaxlimit_tree(const Pft *,Real,Real);
extern void nitrogen_allocation_tree(Real *,Real *,Real *,Stocks,Stocks,Stocks,Real,Real,Real);
extern Real beta_root_tree_ind(const Stand *,int,const Config *);
extern Real beta_root_tree_mass(const Stand *,int,const Config *);
extern Real sla_tree_ind(const Stand *,int,const Config *);
extern Real sla_tree_mass(const Stand *,int,const Config *);
extern Real wooddens_tree_ind(const Stand *,int,const Config *);
extern Real wooddens_tree_mass(const Stand *,int,const Config *);
extern Real age_tree_ind(const Stand *,int,const Config *);
extern Real age_tree_mass(const Stand *,int,const Config *);
extern Real minwscal_tree_ind(const Stand *,int,const Config *);
extern Real minwscal_tree_mass(const Stand *,int,const Config *);
extern Real D95_tree_ind(const Stand *,int,const Config *);
extern Real D95_tree_mass(const Stand *,int,const Config *);
extern Real D95max_tree_ind(const Stand *,int,const Config *);
extern Real D95max_tree_mass(const Stand *,int,const Config *);
extern Real D95max_tree_npp(const Stand *,int,const Config *);
extern Real longevity_tree_ind(const Stand *,int,const Config *);
extern Real longevity_tree_mass(const Stand *,int,const Config *);
extern Real height_tree_ind(const Stand *,int,const Config *);
extern Real height_tree_mass(const Stand *,int,const Config *);
extern Real LAI_tree_ind(const Stand *,int,const Config *);
extern Real LAI_tree_mass(const Stand *,int,const Config *);
extern Real getmaxheight(const Pftlist *,int);
extern Real getrootdepth(Real,int);
extern int getindex(Real,const Histogram *);
extern Bool fwritesaplings(FILE *,const Sapling *,int);
extern void fprintsaplings(FILE *,const Sapling *,int);
extern Sapling *freadsaplings(FILE *,int *,Bool);
extern Bool logging_tree(const Pft *,Real,Limit);

/* Definitions of macros */

#define istree(pft) (getpftpar(pft,type)==TREE)
#define israingreen(pft) getpftpar(pft,phenology)==RAINGREEN
#define fprinttreephys2(file,phys,nind) fprintf(file,"lf %6.2f sw %6.2f hw%6.2f swb %6.2f hwb %6.2f rt %6.2f db %6.2f (gC/m2) %6.2f %6.2f %6.2f %6.2f %6.2f %6.2f %6.2f (gN/m2)",phys.leaf.carbon*nind,phys.sapwood.carbon*nind,phys.heartwood.carbon*nind,phys.sapwood_bg.carbon*nind,phys.heartwood_bg.carbon*nind,phys.root.carbon*nind,phys.debt.carbon*nind,phys.leaf.nitrogen*nind,phys.sapwood.nitrogen*nind,phys.heartwood.nitrogen*nind,phys.sapwood_bg.nitrogen*nind,phys.heartwood_bg.nitrogen*nind,phys.root.nitrogen*nind,phys.debt.nitrogen*nind)
#define phys_sum_tree(ind) (ind.leaf.carbon+ind.root.carbon+ind.heartwood.carbon+ind.sapwood.carbon+ind.sapwood_bg.carbon+ind.heartwood_bg.carbon)
#define phys_sum_tree_n(ind) (ind.leaf.nitrogen+ind.root.nitrogen+ind.heartwood.nitrogen+ind.sapwood.nitrogen+ind.sapwood_bg.nitrogen+ind.heartwood_bg.nitrogen)
#define agb_tree_sum(ind) (ind.leaf.carbon+ind.heartwood.carbon+ind.sapwood.carbon)/*originally (ind.leaf+ind.heartwood+ind.sapwood*0.66)*/
#define fprinttreephys2carbon(file,phys,nind) fprintf(file,"%6.2f %6.2f %6.2f %6.2f %6.2f %6.2f % 6.2f (gC/m2)",phys.leaf.carbon*nind,phys.sapwood.carbon*nind,phys.heartwood.carbon*nind,phys.sapwood_bg.carbon*nind,phys.heartwood_bg.carbon,phys.root.carbon*nind,phys.debt.carbon*nind)

#endif


