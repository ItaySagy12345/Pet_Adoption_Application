export interface NewPet {
    userId?: string,
    petId?: string,
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