export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <section className="bg-[#0B1020] rounded-xl border border-white/5 p-6 space-y-4">
        <h2 className="font-semibold text-white">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#6366F1] flex items-center justify-center text-xl font-bold text-white">
            U
          </div>
          <button className="text-sm text-[#6366F1] hover:text-indigo-400 transition-colors">
            Change avatar
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: 'Your Name', type: 'text' },
            { label: 'Email', value: 'user@example.com', type: 'email' },
          ].map(({ label, value, type }) => (
            <div key={label}>
              <label className="block text-xs text-[#9CA3AF] mb-1.5">{label}</label>
              <input
                type={type}
                defaultValue={value}
                className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#6366F1]/50 transition-colors"
              />
            </div>
          ))}
        </div>
        <button className="bg-[#6366F1] hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save Changes
        </button>
      </section>

      {/* API Key */}
      <section className="bg-[#0B1020] rounded-xl border border-white/5 p-6 space-y-4">
        <h2 className="font-semibold text-white">AI Configuration</h2>
        <div>
          <label className="block text-xs text-[#9CA3AF] mb-1.5">OpenAI API Key</label>
          <input
            type="password"
            placeholder="sk-..."
            className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#6366F1]/50 transition-colors"
          />
          <p className="text-xs text-[#9CA3AF] mt-1.5">
            Your key is stored securely and never shared. Used for AI generation.
          </p>
        </div>
        <div>
          <label className="block text-xs text-[#9CA3AF] mb-1.5">Default Model</label>
          <select className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#6366F1]/50 transition-colors">
            <option>gpt-4o (Recommended)</option>
            <option>gpt-4o-mini (Faster)</option>
            <option>gpt-3.5-turbo (Budget)</option>
          </select>
        </div>
        <button className="bg-[#6366F1] hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save
        </button>
      </section>

      {/* Appearance */}
      <section className="bg-[#0B1020] rounded-xl border border-white/5 p-6 space-y-4">
        <h2 className="font-semibold text-white">Appearance</h2>
        <div className="flex items-center gap-3">
          {['Dark', 'Light', 'System'].map((theme) => (
            <button
              key={theme}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                theme === 'Dark'
                  ? 'bg-[#6366F1]/20 border-[#6366F1]/40 text-[#6366F1]'
                  : 'border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/20'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-red-900/10 rounded-xl border border-red-500/20 p-6 space-y-3">
        <h2 className="font-semibold text-red-400">Danger Zone</h2>
        <p className="text-sm text-[#9CA3AF]">These actions are irreversible. Proceed with caution.</p>
        <button className="text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors">
          Delete Account
        </button>
      </section>
    </div>
  )
}
