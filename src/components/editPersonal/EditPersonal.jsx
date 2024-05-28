import { ChangePersonalContact } from './changePersonalContact/ChangePersonalContact'
import { PersonalEmailChange } from './changeEmail/ChangeEmail'
import { PersonalPassChange } from './changePass/ChangePass'

export default function EditPersonal({
  fullName,
  setFullName,
  mainNumber,
  setMainNumber,
  error,
  setError,
  errorsForm,
  setErrorsForm,
  setFullNameChanged,
  setNumberForSentChanged,
}) {
  return (
    <>
      <ChangePersonalContact
        fullName={fullName}
        setFullName={setFullName}
        setFullNameChanged={setFullNameChanged}
        mainNumber={mainNumber}
        setNumberForSentChanged={setNumberForSentChanged}
        setMainNumber={setMainNumber}
        error={error}
        setError={setError}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
      <PersonalEmailChange />
      <PersonalPassChange />
    </>
  )
}
