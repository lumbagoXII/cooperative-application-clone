import { array, number, object, string, ref } from "yup";
import validator from "validator";
import {
  SavingsTransactionTypes,
  SharesTransactionTypes,
} from "$lib/internal/transaction";
export const CreateCooperativeSchema = object({
  name: string().required("Cooperative name is required."),
  registrationNumber: string().required(
    "Cooperative registraion number is required."
  ),
  registrationDate: string().required("Registration date is required"),
  categoryId: string().uuid().required("Category is required"),
  initials: string().required("Cooperative initials is required."),
  address: string().required("Address is required."),
  account: object().shape({
    givenName: string().required("Given name is required."),
    middleName: string().required("Middlename  is required."),
    surname: string().required("Surname is required."),
    email: string()
      .email("Email is invalid.")
      .required("Account email is required."),
  }),
});

export const EditCooperativeSchema = object({
  id: string().required().uuid(),
  name: string().required("Cooperative name is required."),
  registrationNumber: string().required(
    "Cooperative registraion number is required."
  ),
  registrationDate: string().required("Registration date is required"),
  categoryId: string().uuid().required("Category is required"),
  initials: string().required("Cooperative initials is required."),
  address: string().required("Address is required."),
  account: object().shape({
    id: string().required().uuid(),
    givenName: string().required("Given name is required."),
    middleName: string().required("Middlename  is required."),
    surname: string().required("Surname is required."),
    email: string()
      .email("Email is invalid.")
      .required("Account email is required."),
  }),
});
export const NewMemberValidationSchema = object({
  givenName: string().required("Given name is required."),
  middleName: string().required("Middle name is required."),
  surname: string().required("Surname is required."),
  birthday: string().required("Date of birth is required."),
  gender: string().required("Gender is required."),
  educationalAttainment: string().required(
    "Educational Attainment is required."
  ),
  civilStatus: string().required("Civil status is required."),
  TIN: string().notRequired(),
  spouseName: string().notRequired(),
  presentAddress: string().required("Present address is required."),
  provincialAddress: string().notRequired(),
  officeAddress: string().notRequired(),
  officePhoneNumber: string().notRequired(),
  account: object().shape({
    email: string().email("Email is invalid.").required("Email is required."),
    mobileNumber: string()
      .required("Mobile number is required.")
      .test("is-ph-mobile-number", "Invalid mobile number", (value) =>
        validator.isMobilePhone(value ?? "", "en-PH")
      ),
  }),
  dependents: array()
    .of(
      object({
        name: string().required("Dependent name is required."),
        relationship: string().required(
          "Relationship of the dependent must be specified."
        ),
        birthday: string().required(
          "Dependent's date of birth must be specified."
        ),
      })
    )
    .min(0),
});

export const EditMemberValidationSchema = object({
  id: number().integer().min(1),
  givenName: string().required("Given name is required."),
  middleName: string().required("middle name is required."),
  surname: string().required("Surname is required."),
  gender: string().required("Gender is required."),
  birthday: string().required("Date of birth is required."),
  educationalAttainment: string().required(
    "Educational Attainment is required."
  ),
  civilStatus: string().required("Civil status is required."),
  TIN: string().notRequired(),
  spouseName: string().notRequired(),
  presentAddress: string().required("Present address is required."),
  provincialAddress: string().notRequired(),
  officeAddress: string().notRequired(),
  account: object().shape({
    email: string()
      .email("Email is invalid.")
      .required("Account email is required."),
    mobileNumber: string()
      .required("Mobile number is required.")
      .test("is-ph-mobile-number", "Invalid mobile number", (value) =>
        validator.isMobilePhone(value ?? "", "en-PH")
      ),
  }),
  registrationFee: number().notRequired().typeError("Invalid fee value."),
  officePhoneNumber: string().notRequired(),
  dependents: array()
    .of(
      object({
        name: string().required("Dependent name is required."),
        relationship: string().required(
          "Relationship of the dependent must be specified."
        ),
        birthday: string().required(
          "Dependent's date of birth must be specified."
        ),
      })
    )
    .min(0),
});

export const RegisterMemberAccountSchema = object({
  email: string().required("Email is required.").email("Invalid email format."),
  password: string().required("Password is required."),
  member: object({
    givenName: string().required("Given name is required."),
    middleName: string().required("Middle name is required."),
    surname: string().required("Surname is required."),
    birthday: string().required("Date of birth is required."),
  }),
});

export const AddSharesSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  remarks: string().notRequired(),
});

export const EditSharesSchemaValidation = object({
  id: number().integer().min(1).required(),
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  remarks: string().notRequired(),
});

export const AddShareWithdrawalSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  share: number().required().min(0),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10.")
    .test(
      "check-if-greater-than",
      "Insufficient share balance.",
      function (value) {
        return this.parent.share >= (value ?? 0);
      }
    ),
  remarks: string().notRequired(),
});

export const EditShareWithdrawalSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  share: number().required().min(0),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10.")
    .test(
      "check-if-greater-than",
      "Insufficient share balance.",
      function (value) {
        return this.parent.share >= (value ?? 0);
      }
    ),
  remarks: string().notRequired(),
});

export const AddLoanSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  interest: number()
    .required("Interest is required.")
    .min(1, "Interest should be atleast 1.")
    .integer("Interest value should not be decimal."),
  tenure: number()
    .required("Tenure is required.")
    .min(1, "Tenure should be atleast 1.")
    .integer("Tenure value should not be decimal."),
});

export const EditLoanSchemaValidation = object({
  id: string().uuid().required(),
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  interest: number()
    .required("Interest is required.")
    .min(1, "Interest should be atleast 1.")
    .integer("Interest value should not be decimal."),
  tenure: number()
    .required("Tenure is required.")
    .min(1, "Tenure should be atleast 1.")
    .integer("Tenure value should not be decimal."),
});

export const AddRepaymentModalSchemaValidation = object({
  loanId: string().uuid().required(),
  remainingBalance: number().required(),
  amount: number()
    .test(
      "check-if-greater-than",
      "Amount cannot be greater than remaining balance.",
      function (value) {
        return this.parent.remainingBalance >= (value ?? 0);
      }
    )
    .required("Amount is required."),
  remarks: string().notRequired(),
});

export const AddSavingSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SavingsTransactionTypes.Deposit, SavingsTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  remarks: string().notRequired(),
});

export const EditSavingSchemaValidation = object({
  id: number().integer().min(1).required(),
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SavingsTransactionTypes.Deposit, SavingsTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10."),
  remarks: string().notRequired(),
});

export const AddSavingWithdrawalSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  saving: number().required().min(0),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10.")
    .test(
      "check-if-greater-than",
      "Insufficient saving balance.",
      function (value) {
        return this.parent.saving >= (value ?? 0);
      }
    ),
  remarks: string().notRequired(),
});

export const EditSavingWithdrawalSchemaValidation = object({
  memberId: number()
    .integer("Invalid member id.")
    .required("Please select a member.")
    .min(1, "Please select a member."),
  type: string()
    .required()
    .oneOf(
      [SharesTransactionTypes.Deposit, SharesTransactionTypes.Withdraw],
      "Invalid type value"
    ),
  saving: number().required().min(0),
  amount: number()
    .required("Amount is required.")
    .min(10, "Amount should be atleast 10.")
    .test(
      "check-if-greater-than",
      "Insufficient saving balance.",
      function (value) {
        return this.parent.saving >= (value ?? 0);
      }
    ),
  remarks: string().notRequired(),
});

export const CreateRewardValidation = object({
  name: string().required("Name is required."),
  description: string().required("Description is required."),
  certificateType: string().required("Certificate name is required."),
  certificateDescription: string().required(
    "Certificate description is required."
  ),
});
export const EditRewardValidation = object({
  id: string().uuid().required("Id is required."),
  name: string().required("Name is required."),
  description: string().required("Description is required."),
  certificateType: string().required("Certificate name is required."),
  certificateDescription: string().required(
    "Certificate description is required."
  ),
});

export const GiveRewardValidation = object({
  cooperativeId: string().required().uuid(),
  rewardId: string().uuid().required("Id is required."),
  date: string().required("Date is required"),
});

export const EditGivenRewardValidation = object({
  id: string().required().uuid(),
  cooperativeId: string().required().uuid(),
  rewardId: string().uuid().required("Id is required."),
  date: string().required("Date is required"),
});

export const CreateCooperativeCategoryValidation = object({
  name: string().required("Name is required."),
  requiredAssets: number().required("Required assets is required."),
  criteriaId: string().uuid().required("Criteria is required."),
});

export const EditCooperativeCategoryValidation = object({
  id: string().required().uuid(),
  name: string().required("Name is required."),
  requiredAssets: number().required("Required assets is required."),
  criteriaId: string().uuid().required("Criteria is required."),
});

export const CreateCriteriaValidation = object({
  name: string().required("Criteria name is required."),
  financialPerformancePoints: number()
    .integer("Value should not be decimal value.")
    .required("Financial Performance Points is required.")
    .min(1, "Value should be greater than zero."),
  organizationManagementPoints: number()
    .integer("Value should not be decimal value.")
    .required("Organization Management Points is required.")
    .min(1, "Value should be greater than zero."),
  criteriaFields: array().of(
    object({
      name: string().required("Name is required."),
      maxPoints: number()
        .min(1, "Value should be greter than zero")
        .typeError("Invalid Value")
        .integer("Value should not contain decimal values.")
        .transform((value) => (isNaN(value) || value === null ? 0 : value))
        .required("Max points is required."),
    })
  ),
});

export const EditCriteriaValidation = object({
  id: string().required().uuid(),
  name: string().required("Criteria name is required."),
  financialPerformancePoints: number()
    .integer("Value should not be decimal value.")
    .required("Financial Performance Points is required.")
    .min(1, "Value should be greater than zero."),
  organizationManagementPoints: number()
    .integer("Value should not be decimal value.")
    .required("Organization Management Points is required.")
    .min(1, "Value should be greater than zero."),
  criteriaFields: array().of(
    object({
      name: string().required("Name is required."),
      maxPoints: number()
        .min(1, "Value should be greter than zero")
        .typeError("Invalid Value")
        .integer("Value should not contain decimal values.")
        .transform((value) => (isNaN(value) || value === null ? 0 : value))
        .required("Max points is required."),
    })
  ),
});

export const EditDefaultCriteriaPointValidation = object({
  cooperativeId: string().required().uuid(),
  categoryId: string().required().uuid(),
  financialPerformancePoints: number()
    .integer("Value should not be decimal value.")
    .required("Financial Performance Points is required.")
    .min(0, "Value should be greater than zero."),
  organizationManagementPoints: number()
    .integer("Value should not be decimal value.")
    .required("Organization Management Points is required.")
    .min(0, "Value should be greater than zero."),
});

export const EditCriteriaFieldPointValidation = object({
  cooperativeId: string().required().uuid(),
  categoryId: string().required().uuid(),
  criteriaFieldId: string().required().uuid(),
  points: number()
    .integer("Value should not be decimal value.")
    .required("Financial Performance Points is required.")
    .transform((value) => (isNaN(value) || value === null ? 0 : value))
    .min(0, "Value should be greater than zero."),
});
