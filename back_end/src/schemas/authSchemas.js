import S from 'fluent-json-schema';

export const signUpSchema = S.object()
    .prop('firstName', S.string().minLength(1).maxLength(45).required())
    .prop('lastName', S.string().minLength(1).maxLength(45).required())
    .prop('email', S.string().minLength(1).maxLength(45).required())
    .prop('phoneNumber', S.string().minLength(10).maxLength(10).required())
    .prop('password', S.string().minLength(1).maxLength(45).required())
    .prop('confirmPassword', S.string().minLength(1).maxLength(45).required())
    .valueOf();

export const logInSchema = S.object()
    .prop('email', S.string().minLength(1).maxLength(45).required())
    .prop('password', S.string().minLength(1).maxLength(45).required())
    .valueOf();