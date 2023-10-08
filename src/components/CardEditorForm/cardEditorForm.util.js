

function handleChangeCountry(event) {
    const value = event.target.value;
    updateFormDate("country", value);
}

function handleChangeCity(event) {
    const value = event.target.value;
    updateFormDate("city", value);
}

function handleChangeDuration(event) {
    const value = event.target.value;
    const isValid = isWithinRange(value, MIN_DURATION, MAX_DURATION);

    updateFormDate("duration", value);
    updateFormErrors("duration", !isValid);
}

function handleChangePopularity(event) {
    let value = event.target.value;
    value = value.replaceAll(/,/g, "");

    let isValid = isWithinRange(value, MIN_POPULARITY, MAX_POPULARITY);

    value = numberFormatter(value).addCommas().value();

    updateFormDate("popularity", value);
    updateFormErrors("popularity", !isValid);
}

function handleChangeRating(event) {
    const value = event.target.value;
    let isValid = isWithinRange(
        value,
        MIN_RATING,
        MAX_RATING,
        true,
        false,
        true
    );

    updateFormDate("rating", value);
    setFormErrors((prev) => ({ ...prev, rating: !isValid }));
}

function handleChangePriceOriginal(event) {
    let value = event.target.value;
    value = value.replaceAll(/,/g, "");
    const isValid = isWithinRange(value, MIN_PRICE, MAX_PRICE);

    updateFormDate("priceOffered", numberFormatter(value).addCommas().value());
    updateFormErrors("priceOffered", !isValid);
}

function handleChangePriceOffered(event) {
    let value = event.target.value;
    value = value.replaceAll(/,/g, "");
    const isValid = isWithinRange(value, MIN_PRICE, removeCommas(formData.priceOffered));
    console.log(value, isValid, removeCommas(formData.priceOffered))
    updateFormDate("priceOriginal", numberFormatter(value).addCommas().value());
    updateFormErrors("priceOriginal", !isValid);
}

function handleImageChange(event) {
    const file = event.target.files[0];
    const isValid = validateImageFile(file)
    console.log(isValid)
    updateFormErrors('thumbnailSrc', !isValid)

    if(!isValid) return;

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
        const img = event.target.result;
        updateFormDate('thumbnailSrc', img)
    };

    fileReader.readAsDataURL(file);
}

function validateImageFile(file){
    if (!file) return false;
    if (!REGEX_IMG_TYPE.test(file.type)) return false;
    if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;

    return true
}

function updateFormDate(key, value) {
    setFormData(function (prev) {
        return {
            ...prev,
            [key]: value,
        };
    });
}

function updateFormErrors(key, value) {
    setFormErrors(function (prev) {
        return {
            ...prev,
            [key]: value,
        };
    });
}

function checkFormErrors() {
    for (let key in formErrors) {
        if (formErrors[key]) return true;
    }

    return false;
}

function isWithinRange(
    value,
    min,
    max,
    acceptEmpty = true,
    allowFraction = false,
    allowHalves = false
) {
    const debug = true;
    value = value.toString();
    min = +min
    max = +max

    // terminate if min or max are not numbers
    if(isNaN(min) || isNaN(max)) return false

    debug && console.log(1);
    // terminate if the value is empty
    if (!value) return acceptEmpty;

    debug && console.log(2);
    // terminate if the value is not a number
    if (Number.isNaN(Number(value))) return false;

    debug && console.log(3);
    // terminate if number is outside range
    if (value < min) return false;

    debug && console.log(4);
    //terminate if number is outside range
    if (value > max) return false;

    let fractionPart = Number(value.split(".")[1]);

    debug && console.log(5);
    //terminate if fractions are not allow but halves are, and the fraction part is neither none nor 0.5
    if (allowHalves && !allowFraction)
        return fractionPart ? fractionPart === 5 : true;

    debug && console.log(6);
    //terminate if fractions are not allowed and there is a fraction part
    if (!allowFraction) return fractionPart ? fractionPart === 0 : true;

    return true;
}