'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { EDUCATION_LEVELS, ID_TYPES, MIN_COFOUNDERS, MIN_REFERENCES, ONBOARDING_STEPS, REFERENCE_TYPES } from '../../../src/data';
import { CofounderRow, ReferenceEntry, WorkHistoryEntry } from '../../../src/lib/useFounderStartup';
import { uploadFounderDocument } from '../../../src/lib/uploadDocument';
import { CameraCapture } from '../../../src/components/CameraCapture';
import { ErrorBanner, Field, GhostButton, GoldButton, StepFooter } from '../../../src/components/ui';

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-ln bg-card px-4 py-3 font-sans text-sm text-tx outline-none focus:border-pu"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function WorkHistorySection({ entries, onChange }: { entries: WorkHistoryEntry[]; onChange: (next: WorkHistoryEntry[]) => void }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!company.trim() || !role.trim() || !startDate.trim()) return;
    onChange([...entries, { id: String(Date.now()), company: company.trim(), role: role.trim(), startDate, endDate, description: description.trim() }]);
    setCompany('');
    setRole('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <div className="mb-5">
      {entries.map((w) => (
        <div key={w.id} className="mb-2 flex items-start justify-between rounded-md border border-ln bg-card p-3">
          <div>
            <p className="font-sans text-sm font-medium text-tx">{w.role} · {w.company}</p>
            <p className="font-mono text-[10px] text-mu">{w.startDate} – {w.endDate || 'Present'}</p>
            {w.description && <p className="mt-1 font-sans text-xs font-light text-mu">{w.description}</p>}
          </div>
          <button type="button" onClick={() => onChange(entries.filter((e) => e.id !== w.id))} className="shrink-0 font-sans text-xs text-da">
            Remove
          </button>
        </div>
      ))}

      <div className="rounded-md border border-ln bg-card p-4">
        <Field label="Company" value={company} onChange={setCompany} placeholder="Flutterwave" />
        <Field label="Role" value={role} onChange={setRole} placeholder="Product Manager" />
        <Field label="Start date" value={startDate} onChange={setStartDate} type="date" />
        <Field label="End date (leave blank if current)" value={endDate} onChange={setEndDate} type="date" />
        <Field label="What did you do there? (optional)" value={description} onChange={setDescription} placeholder="Led the payments team…" />
        <GhostButton onClick={handleAdd}>Add work history entry</GhostButton>
      </div>
    </div>
  );
}

function ReferencesSection({ entries, onChange }: { entries: ReferenceEntry[]; onChange: (next: ReferenceEntry[]) => void }) {
  const [type, setType] = useState<string>('');
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (!type || !name.trim() || !relationship.trim() || !phone.trim()) return;
    onChange([...entries, { id: String(Date.now()), type: type as ReferenceEntry['type'], name: name.trim(), relationship: relationship.trim(), phone: phone.trim(), email: email.trim() }]);
    setType('');
    setName('');
    setRelationship('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="mb-5">
      {entries.map((r) => (
        <div key={r.id} className="mb-2 flex items-start justify-between rounded-md border border-ln bg-card p-3">
          <div>
            <p className="font-sans text-sm font-medium text-tx">{r.name} <span className="font-mono text-[9px] text-pu">· {r.type.toUpperCase()}</span></p>
            <p className="font-mono text-[10px] text-mu">{r.relationship} · {r.phone}</p>
          </div>
          <button type="button" onClick={() => onChange(entries.filter((e) => e.id !== r.id))} className="shrink-0 font-sans text-xs text-da">
            Remove
          </button>
        </div>
      ))}

      <div className="rounded-md border border-ln bg-card p-4">
        <Select label="Reference type" value={type} onChange={setType} options={[...REFERENCE_TYPES]} />
        <Field label="Full name" value={name} onChange={setName} placeholder="Ada Lovelace" />
        <Field label="Relationship" value={relationship} onChange={setRelationship} placeholder="Former manager at Flutterwave" />
        <Field label="Phone" value={phone} onChange={setPhone} placeholder="+234 801 234 5678" />
        <Field label="Email (optional)" value={email} onChange={setEmail} placeholder="ada@example.com" />
        <GhostButton onClick={handleAdd}>Add reference</GhostButton>
      </div>
    </div>
  );
}

function VerifyForm({ cofounder, onDone }: { cofounder: CofounderRow; onDone: () => void }) {
  const { user } = useAuth();
  const { updateCofounder } = useFounderStartupContext();
  const idInputRef = useRef<HTMLInputElement>(null);

  const [dob, setDob] = useState(cofounder.date_of_birth ?? '');
  const [phone, setPhone] = useState(cofounder.phone ?? '');
  const [nationality, setNationality] = useState(cofounder.nationality ?? '');
  const [address, setAddress] = useState(cofounder.address_line ?? '');
  const [previousAddress, setPreviousAddress] = useState(cofounder.previous_address ?? '');
  const [currentCity, setCurrentCity] = useState(cofounder.current_city ?? '');
  const [stateOfOrigin, setStateOfOrigin] = useState(cofounder.state_of_origin ?? '');
  const [stateOfResidence, setStateOfResidence] = useState(cofounder.state_of_residence ?? '');
  const [postcode, setPostcode] = useState(cofounder.postcode ?? '');
  const [educationLevel, setEducationLevel] = useState(cofounder.education_level ?? '');
  const [educationInstitution, setEducationInstitution] = useState(cofounder.education_institution ?? '');
  const [idType, setIdType] = useState(cofounder.id_type ?? '');
  const [idNumber, setIdNumber] = useState(cofounder.id_number ?? '');
  const [socialLink, setSocialLink] = useState(cofounder.social_link ?? '');
  const [selfieUrl, setSelfieUrl] = useState(cofounder.selfie_url);
  const [idDocUrl, setIdDocUrl] = useState(cofounder.id_document_url);
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>(cofounder.work_history ?? []);
  const [references, setReferences] = useState<ReferenceEntry[]>(cofounder.reference_list ?? []);
  const [uploadingId, setUploadingId] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const hasWorkRef = references.some((r) => r.type === 'Work');
  const hasCharacterRef = references.some((r) => r.type === 'Character');
  const referencesOk = references.length >= MIN_REFERENCES && hasWorkRef && hasCharacterRef;

  const canSave =
    dob.trim() && phone.trim() && nationality.trim() && address.trim() &&
    currentCity.trim() && stateOfOrigin.trim() && stateOfResidence.trim() && postcode.trim() &&
    workHistory.length > 0 && educationLevel && referencesOk &&
    idType && idNumber.trim() && selfieUrl && idDocUrl && socialLink.trim();

  const handleSelfieCapture = async (file: File) => {
    if (!user) return;
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, 'cofounder-selfie');
    if (uploadError) { setError(uploadError); return; }
    setSelfieUrl(path);
  };

  const handleIdFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingId(true);
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, 'cofounder-id');
    setUploadingId(false);
    if (uploadError) { setError(uploadError); return; }
    setIdDocUrl(path);
  };

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    const result = await updateCofounder(cofounder.id, {
      date_of_birth: dob.trim(),
      phone: phone.trim(),
      nationality: nationality.trim(),
      address_line: address.trim(),
      previous_address: previousAddress.trim() || null,
      current_city: currentCity.trim(),
      state_of_origin: stateOfOrigin.trim(),
      state_of_residence: stateOfResidence.trim(),
      postcode: postcode.trim(),
      education_level: educationLevel,
      education_institution: educationInstitution.trim(),
      work_history: workHistory,
      reference_list: references,
      id_type: idType,
      id_number: idNumber.trim(),
      selfie_url: selfieUrl,
      id_document_url: idDocUrl,
      selfie_done: true,
      id_verified: true,
      social_link: socialLink.trim(),
    });
    setSaving(false);
    if (result.error) { setError(result.error); return; }
    onDone();
  };

  return (
    <div className="mt-3 rounded-md border border-ln bg-bg p-4">
      <ErrorBanner message={error} />

      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-pu">Personal details</p>
      <Field label="Date of birth" value={dob} onChange={setDob} type="date" />
      <Field label="Phone number" value={phone} onChange={setPhone} placeholder="+234 801 234 5678" />
      <Field label="Nationality" value={nationality} onChange={setNationality} placeholder="Nigerian" />

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Address</p>
      <Field label="Current residential address" value={address} onChange={setAddress} placeholder="12 Adeola Odeku St, Victoria Island, Lagos" />
      <Field label="Previous address (if moved in the last 5 years)" value={previousAddress} onChange={setPreviousAddress} placeholder="Optional" />
      <Field label="Current city" value={currentCity} onChange={setCurrentCity} placeholder="Lagos" />
      <Field label="State of origin" value={stateOfOrigin} onChange={setStateOfOrigin} placeholder="Anambra" />
      <Field label="State of residence" value={stateOfResidence} onChange={setStateOfResidence} placeholder="Lagos" />
      <Field label="Postcode" value={postcode} onChange={setPostcode} placeholder="106104" />
      <a
        href="https://www.loca8tor.com/generate"
        target="_blank"
        rel="noopener noreferrer"
        className="-mt-3 mb-5 inline-block font-sans text-xs font-medium text-ch hover:underline"
      >
        Don&apos;t know your postcode? Generate one at loca8tor.com →
      </a>

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Work history</p>
      <WorkHistorySection entries={workHistory} onChange={setWorkHistory} />

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Education</p>
      <Select label="Highest level of education" value={educationLevel} onChange={setEducationLevel} options={EDUCATION_LEVELS} />
      <Field label="Institution attended" value={educationInstitution} onChange={setEducationInstitution} placeholder="University of Lagos" />

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">
        References <span className="text-mu">(at least {MIN_REFERENCES}, including one work and one character reference)</span>
      </p>
      <ReferencesSection entries={references} onChange={setReferences} />
      {references.length > 0 && !referencesOk && (
        <p className="-mt-3 mb-5 font-sans text-xs text-warn">
          Need at least {MIN_REFERENCES} references, including one Work and one Character reference.
        </p>
      )}

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Identity verification</p>
      <Select label="ID type" value={idType} onChange={setIdType} options={ID_TYPES} />
      <Field label="ID number" value={idNumber} onChange={setIdNumber} placeholder="A12345678" />

      <CameraCapture label="Selfie" facingMode="user" onCapture={handleSelfieCapture} />
      {selfieUrl && <p className="-mt-3 mb-5 font-mono text-[10px] uppercase tracking-wider text-su">✓ Selfie uploaded</p>}

      <div className="mb-5">
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">ID document</label>
        <button
          type="button"
          onClick={() => idInputRef.current?.click()}
          disabled={uploadingId}
          className={`w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
            idDocUrl ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
          }`}
        >
          {uploadingId ? 'Uploading…' : idDocUrl ? '✓ ID document uploaded' : '🪪 Upload passport or national ID'}
        </button>
        <input ref={idInputRef} type="file" accept="image/*,.pdf" capture="environment" onChange={handleIdFile} className="hidden" />
      </div>

      <Field label="Personal social link (LinkedIn, Twitter/X, Instagram)" value={socialLink} onChange={setSocialLink} placeholder="https://linkedin.com/in/yourname" />

      <GoldButton onClick={handleSave} disabled={!canSave || saving}>{saving ? 'Saving…' : 'Save verification'}</GoldButton>
    </div>
  );
}

export default function CofoundersPage() {
  const router = useRouter();
  const { cofounders, addCofounder, removeCofounder } = useFounderStartupContext();
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);

  const meetsMinimum = cofounders.length >= MIN_COFOUNDERS;
  const allVerified = cofounders.every((c) => c.selfie_done && c.id_verified && !!c.social_link);

  const handleAdd = async () => {
    if (!name.trim() || !role.trim()) return;
    setError(null);
    const result = await addCofounder(name.trim(), role.trim());
    if (result.error) { setError(result.error); return; }
    setName('');
    setRole('');
    setAdding(false);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Verify co-founders</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        WAAW requires at least {MIN_COFOUNDERS} co-founders per startup. Every co-founder must
        provide personal details, address, education, a selfie, and a government ID for review.
      </p>

      <ErrorBanner message={error} />

      {!meetsMinimum && (
        <div className="mb-4 rounded-md border border-warnBorder bg-warnLight p-3 font-sans text-xs text-warn">
          {cofounders.length} of {MIN_COFOUNDERS} minimum co-founders added.
        </div>
      )}

      {cofounders.map((c, i) => {
        const done = c.selfie_done && c.id_verified && !!c.social_link;
        const removable = i > 0 && !done;
        return (
          <div key={c.id} className="mb-2 rounded-md border border-ln bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm font-medium text-tx">{c.name}</p>
                <p className="font-mono text-[10px] text-mu">{c.role}</p>
              </div>
              <div className="flex items-center gap-3">
                {done ? (
                  <span className="rounded-sm bg-su px-2 py-1 font-mono text-[8px] text-white">VERIFIED</span>
                ) : (
                  <button type="button" onClick={() => setVerifyingId(c.id)} className="font-sans text-xs font-semibold text-ch">
                    Verify
                  </button>
                )}
                {removable && (
                  <button type="button" onClick={() => removeCofounder(c.id)} className="font-sans text-xs text-da">
                    Remove
                  </button>
                )}
              </div>
            </div>
            {verifyingId === c.id && <VerifyForm cofounder={c} onDone={() => setVerifyingId(null)} />}
          </div>
        );
      })}

      {adding ? (
        <div className="mt-3 rounded-md border border-ln bg-card p-4">
          <Field label="Full name" value={name} onChange={setName} placeholder="Chidi Obi" />
          <Field label="Role" value={role} onChange={setRole} placeholder="Co-founder / CTO" />
          <GhostButton onClick={handleAdd}>Add co-founder</GhostButton>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="mt-3 font-sans text-sm font-medium text-ch">
          + Add another co-founder
        </button>
      )}

      <StepFooter
        backHref={ONBOARDING_STEPS[0].path}
        onContinue={() => router.push(ONBOARDING_STEPS[2].path)}
        disabled={!meetsMinimum || !allVerified}
      />
    </div>
  );
}
