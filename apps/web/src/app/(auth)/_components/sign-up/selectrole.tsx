import Link from "next/link";

const ChooseRole = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Participant Role */}
        <Link href="/register?role=participant">
          <div className="cursor-pointer p-8 bg-white shadow-lg rounded-lg flex flex-col items-center transition duration-300 hover:shadow-xl hover:bg-blue-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register as Participant</h2>
            <p className="text-gray-600 text-center">
              Discover and attend events as a participant. Browse through event listings, register, and join events that interest you!
            </p>
          </div>
        </Link>

        {/* Organizer Role */}
        <Link href="/register?role=organizer">
          <div className="cursor-pointer p-8 bg-white shadow-lg rounded-lg flex flex-col items-center transition duration-300 hover:shadow-xl hover:bg-green-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register as Event Organizer</h2>
            <p className="text-gray-600 text-center">
              Organize and promote events. Create event listings, manage registrations, and engage with your attendees!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChooseRole;
