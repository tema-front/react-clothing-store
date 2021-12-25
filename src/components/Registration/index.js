
export const Registration = () => {
    return (

        <form class="registration-form-datas">
            <div class="registration-data-name">
                <span class="registration-data-name-title">Your Name</span>
                <input type="text" class="registration-form-inputs registration-data-name-input registration-data-first-name" placeholder="First Name" />
                <input type="text" class="registration-form-inputs registration-data-name-input registration-data-last-name" placeholder="Last Name" />
                <div class="registration-radio-btns">
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-male" value="male" />
                    <label class="registration-radio-btns-txt" for="registration-radio-btn-male">Male</label>
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-female" value="female" />
                    <label class="registration-radio-btns-txt" for="registration-radio-btn-female">Female</label>
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-other" value="female" />
                    <label class="registration-radio-btns-txt" for="registration-radio-btn-other">Other</label>
                </div>
            </div>
            <div class="registration-login-details">
                <span class="registration-login-details-title">Login details</span>
                <input type="email" class="registration-form-inputs registration-login-email" placeholder="Email" />
                <input type="password" class="registration-form-inputs registration-login-password" placeholder="Password" />
                <p class="registration-login-details-txt">Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters</p>
            </div>
            <button class="registration-form-datas-submit">join now</button>
        </form>

    );
}