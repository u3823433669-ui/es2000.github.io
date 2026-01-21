export interface CardData {
  id: string;
  frontType: 'text' | 'image';
  frontContent: string;
  backType: 'text' | 'image';
  backContent: string;
  isFlipped: boolean;
}
export type Side = 'front' | 'back';
