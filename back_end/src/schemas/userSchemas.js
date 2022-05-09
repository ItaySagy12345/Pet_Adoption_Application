import S from 'fluent-json-schema';

export const updateUserDetailsSchema = S.object()
    .prop('email', S.string().minLength(1).maxLength(45))
    .prop('phoneNumber', S.string().minLength(10).maxLength(10))
    .prop('personalBio', S.string().minLength(1).maxLength(45))
    .valueOf();

export const updateUserPasswordSchema = S.object()
    .prop('oldPassword', S.string().minLength(1).maxLength(45).required())
    .prop('newPassword', S.string().minLength(1).maxLength(45).required())
    .prop('confirmNewPassword', S.string().minLength(1).maxLength(45).required())
    .valueOf();