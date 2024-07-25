export interface TweetInterface {
  id?: string; // Identifiant optionnel, Firebase génère automatiquement un identifiant pour chaque document
  content: string; // Contenu du tweet
  createdAt: Date; // Date de création du tweet
}
