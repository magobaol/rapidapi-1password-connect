const OnePasswordCSApi = require('./1password-connect-api.js');

var opcs = function() {

    function validateRequiredInputFields(context) {
        if (context.opcsBaseUrl === "") {
            return false;
        }
        if (context.opcsBearerToken === "") {
            return false;
        }
        if (context.opcsVaultId === "") {
            return false;
        }
        if (context.itemTitle === "") {
            return false;
        }
        if (context.fieldName === "") {
            return false;
        }
        return true;
    }

    this.evaluate = function() {
        if (validateRequiredInputFields(this)) {
            const op = new OnePasswordCSApi(this.opcsBearerToken,
                this.opcsBaseUrl,
                this.opcsVaultId);
            return op.getFieldValueForItemByTitle(this.itemTitle, this.fieldName);
        }
    }

    this.title = function(context) {
        return "1P Connect"
    }

    this.text = function(context) {
        if ((this.itemTitle !== "") && (this.fieldName !== "")) {
            return this.itemTitle + "/" + this.fieldName;
        } else {
            return "";
        }
    }
}
// set the Extension Identifier (must be same as the directory name)
opcs.identifier = "it.francescoface.PawExtensions.1password-connect";

// give a display name to your Dynamic Value
opcs.title = "1Password Connect";

// link to the Dynamic Value documentation
opcs.help = "https://github.com/magobaol/rapidapi-1password-connect";

opcs.inputs = [
    InputField("opcsBaseUrl", "Base url", "String", {persisted: true, defaultValue: "", placeholder: "1Password Connect Server base url (including /v1/)"}),
    InputField("opcsBearerToken", "Bearer token", "SecureValue", {placeholder: "1Password Connect Server Bearer token"}),
    InputField("opcsVaultId", "Vault id", "String", {persisted: true, defaultValue: "", placeholder: "Unique id of the vault where your secrets are stored"}),
    InputField("itemTitle", "Item title", "String", {persisted: true, defaultValue: "", placeholder: "Enter the title exactly as it is in 1Password"}),
    InputField("fieldName", "Field name", "String", {persisted: true, defaultValue: "credential", placeholder: "Enter the name of the field you want to retrieve"})
];

// call to register function is required
registerDynamicValueClass(opcs)
