import { PrimaryButton, NumberField, SelectField } from '@shared/ui'
import type { UserMetricsFormState } from '@shared/domain'
import type { FormEvent } from 'react'

interface ProfileFormProps {
  form: UserMetricsFormState
  onSubmit: (e: FormEvent) => void
}

export function ProfileForm({ form: { weight, height, age, diagnosisAge, glucose, glucoseContext, gender, paf, setWeight, setHeight, setAge, setDiagnosisAge, setGlucose, setGlucoseContext, setGender, setPaf }, onSubmit }: ProfileFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3"
      aria-label="Formulario de perfil metabólico"
      noValidate
    >
      <div className="grid grid-cols-2 gap-3">
        <NumberField id="weight" label="Peso (kg)" value={weight} onChange={setWeight} min={30} />
        <NumberField id="height" label="Altura (cm)" value={height} onChange={setHeight} min={100} />
        <NumberField id="age" label="Edad" value={age} onChange={setAge} min={18} />
        <NumberField id="diagnosisAge" label="Edad diagnóstico DT2" value={diagnosisAge} onChange={setDiagnosisAge} min={0} />
        <NumberField id="glucose" label="Glucosa (mg/dL)" value={glucose} onChange={setGlucose} min={0} />
        <SelectField
          id="gender"
          label="Género"
          value={gender}
          onChange={setGender}
          options={[
            { value: 'male', label: 'Hombre' },
            { value: 'female', label: 'Mujer' },
          ]}
        />
      </div>
      <SelectField
        id="paf"
        label="Factor de actividad física"
        value={paf}
        onChange={setPaf}
        options={[
          { value: '1.2', label: 'Sedentario (1.2)' },
          { value: '1.375', label: 'Ligero (1.375)' },
          { value: '1.55', label: 'Moderado (1.55)' },
          { value: '1.725', label: 'Activo (1.725)' },
          { value: '1.9', label: 'Muy activo (1.9)' },
        ]}
      />
      <SelectField
        id="glucoseContext"
        label="Contexto glucosa"
        value={glucoseContext}
        onChange={setGlucoseContext as (v: string) => void}
        options={[
          { value: 'fasting', label: 'Ayunas' },
          { value: 'postprandial', label: 'Postprandial' },
        ]}
      />
      <PrimaryButton type="submit">
        Calcular perfil
      </PrimaryButton>
    </form>
  )
}
