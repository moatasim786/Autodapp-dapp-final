export const validateFunctionRegister = ({ values, errors }) => {
    const rules = {
        login: (value) => {
            if (!value) {
                return errors.login = 'Укажите свой логин';
            }
        },
        email: (value) => {
            if (!value) {
                return errors.email = 'Введите E-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return errors.email = 'Неверный E-mail';
            }
        },
        password: (value) => {
            if (!value) {
                return errors.password = 'Введите пароль';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(value)) {
                return errors.password = 'Слишком легкий пароль';
            }
        },
        password_confirmation: (value) => {
            if (value !== values.password) {
                return errors.password_confirmation = 'Пароли не совпадают';
            }
        },
        agreement: (bool) => {
            if (!bool) {
                return errors.agreement = 'Примите правила и условия пользовательского соглашения';
            }
        }
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
}

export const validateFunctionLogin = ({ values, errors }) => {
    const rules = {
        login: (value) => {
            if (!value) {
                return errors.login = 'Укажите свой логин';
            }
        }
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
}

export const validateFunctionReset = ({ values, errors }) => {
    const rules = {
        email: (value) => {
            if (!value) {
                return errors.email = 'Введите E-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return errors.email = 'Неверный E-mail';
            }
        }
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
}

export const validateFunctionChangePassword = ({ values, errors }) => {
    const rules = {
        password: (value) => {
            if (!value) {
                return errors.password = 'Введите пароль';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(value)) {
                return errors.password = 'Слишком легкий пароль';
            }
        },
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );
}