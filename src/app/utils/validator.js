export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValedate;
        switch (validateMethod) {
        case "isRequired":
        {
            if (typeof data === "boolean") {
                statusValedate = !data;
            } else {
                statusValedate = data.trim() === "";
            }
            break;
        }
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValedate = !emailRegExp.test(data);
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g;
            statusValedate = !capitalRegExp.test(data);
            break;
        }
        case "isContainDigit": {
            const digitRegExp = /\d+/g;
            statusValedate = !digitRegExp.test(data);
            break;
        }
        case "min": {
            statusValedate = data.length < config.value;
            break;
        }
        default:
            break;
        }
        if (statusValedate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
