export interface UpdatedPet {
    petId: string,
    userId: string | null,
    animalType: string,
    name: string,
    adoptionStatus: string,
    height: string,
    weight: string,
    color: string,
    hypoallergenicStatus: string,
    breed: string,
    dietaryRestrictions: string,
    bio: string,
    image: File | undefined,
}