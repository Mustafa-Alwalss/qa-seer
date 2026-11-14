import {useTranslation} from "react-i18next";

function LanguageSwitcher() {
    const {t, i18n} = useTranslation();
    const isArabic = i18n.resolvedLanguage === "ar";

    return (
        <button
            type="button"
            role="switch"
            dir="ltr"
            aria-checked={isArabic}
            aria-label={t("language.switchTo")}
            title={t("language.switchTo")}
            className={`language-switch${isArabic ? " is-ar" : ""}`}
            onClick={() => i18n.changeLanguage(isArabic ? "en" : "ar")}
        >
            <span className="language-switch-knob"/>
            <span className="language-switch-label label-en">EN</span>
            <span className="language-switch-label label-ar">ع</span>
        </button>
    );
}

export default LanguageSwitcher;
