export interface PetSearch {
    animalType?: string,
    adoptionStatus?: number | undefined,
    breed?: string,
    minHeight?: number | null,
    maxHeight?: number | null,
    minWeight?: number | null,
    maxWeight?: number | null;
}