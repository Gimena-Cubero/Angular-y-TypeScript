import type { Taxon } from "./taxon.model"; 

export interface FavoritoDetalle {
  taxonId: number;
  nota: string;
  taxon: Taxon | null;
}