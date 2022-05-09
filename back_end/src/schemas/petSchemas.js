import S from 'fluent-json-schema';

export const newPetSchema = S.object()
    .prop('animalType', S.string().minLength(1).maxLength(45).required())
    .prop('name', S.string().minLength(1).maxLength(45).required())
    .prop('adoptionStatus', S.number().required())
    .prop('height', S.number().required())
    .prop('weight', S.number().required())
    .prop('color', S.string().minLength(1).maxLength(45).required())
    .prop('hypoallergenicStatus', S.number().required())
    .prop('breed', S.string().minLength(1).maxLength(45).required())
    .prop('dietaryRestrictions', S.string().minLength(1).maxLength(100).required())
    .prop('bio', S.string().minLength(1).maxLength(100).required())
    .valueOf();

export const updatePetSchema = S.object()
    .prop('petId', S.string().minLength(1).maxLength(5).required())
    .prop('userId', S.anyOf([S.string().minLength(1).maxLength(5), S.null()]))
    .prop('animalType', S.string().minLength(1).maxLength(45).required())
    .prop('name', S.string().minLength(1).maxLength(45).required())
    .prop('adoptionStatus', S.number().required())
    .prop('height', S.number().required())
    .prop('weight', S.number().required())
    .prop('color', S.string().minLength(1).maxLength(45).required())
    .prop('hypoallergenicStatus', S.number().required())
    .prop('breed', S.string().minLength(1).maxLength(45).required())
    .prop('dietaryRestrictions', S.string().minLength(1).maxLength(100).required())
    .prop('bio', S.string().minLength(1).maxLength(100).required())
    .valueOf();

export const saveUnSavePetSchema = S.object()
    .prop('id', S.string().minLength(1).maxLength(45).required())
    .valueOf();