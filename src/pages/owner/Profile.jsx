export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="bg-slate-900 rounded-xl p-6 max-w-xl">
        <div className="mb-4">
          <label>Name</label>

          <p className="mt-2">{user.name}</p>
        </div>

        <div className="mb-4">
          <label>Email</label>

          <p className="mt-2">{user.email}</p>
        </div>

        <div>
          <label>Role</label>

          <p className="mt-2">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
