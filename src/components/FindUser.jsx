import { startTransition } from "react";
import { useState, useTransition } from "react";
import { users } from "./fakeUsr";

export default function FindUser({ users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(users);
  const [isPending, startTransition] = useTransition();
  console.log(filtered);
  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value);
    //Execution of non-urgent state update
    startTransition(() => {
      //filter the user list based on the search term

      setFiltered(
        users.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  };
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl my-2">User Finder</h1>
      <div className="text-md my-2">
        {isPending ? (
          <div>Loading ...</div>
        ) : (
          <p>
            {users.length !== filtered.length
              ? `${filtered.length} matches`
              : null}{" "}
          </p>
        )}
      </div>
      <div>
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Type a name"
          className="border border-slate-300 p-1 rounded-sm"
        />
        {isPending ? (
          <div>Loading ...</div>
        ) : (
          <div className="flex flex-wrap justify-center items-center">
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <div
                  key={user.userId}
                  className="flex flex-col m-2 border rounded-md"
                >
                  <div className="rounded my-2">
                    <img
                      src={user.avatar}
                      alt={`Avatar image of ${user.name}`}
                      className="w-32 h-32 rounded-full"
                    />
                  </div>
                  <p className="text-xl text-center">
                    <strong>{user.name}</strong>
                  </p>
                </div>
              ))
            ) : (
              <h3 className="text-3xl lg-gray-200 p-2 border">
                The match not found...
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
