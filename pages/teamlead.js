import React, { useState } from "react";
import { useSelector } from "react-redux";
import clientPromise from "../lib/mongodb";

import { useRouter } from "next/router";

const Teamleaddashboard = ({ Users, forms, leave, questions }) => {
  const details = forms[0].projects;
  console.log("forms", questions);

  const user = useSelector((state) => state.user);
  console.log("loginedin", user);
  const [command, setCommand] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = user?.user?.user?.email;
  const name = user?.user?.user?.name;
  const assistArray = user?.user?.user?.trainee || [];
  const router = useRouter();
  console.log("selected user", selectedUser);
  const selectiontrainee = selectedUser?.userName;
  console.log("User", Users);
  const surveylist = Users.filter((e) => {
    return e.user?.user?.user.name === selectiontrainee;
  });
  console.log("survey:", surveylist);
  let leaverequest = leave.filter((i) => {
    return i.lead === name;
  });
  console.log("user", leaverequest);
  const handleProjectClick = (project) => {
    router.push({
      pathname: "/project",
      query: {
        project: JSON.stringify(project),
        trainee: JSON.stringify(assistArray),
        user: name,
      },
    });
  };
  // console.log("fil",filterproject)
  const handleleaverequest = () => {
    router.push({
      pathname: "/leaverequest",
      query: {
        user: name,
      },
    });
  };

  let filteredUsers = details.filter((user) => {
    return user.assigned === name;
  });
  console.log("asssis", filteredUsers);
  console.log("asssis fsf", assistArray);

  const handleUserButtonClick = (userName, id) => {
    setIsModalOpen(true);
    console.log("id", id);
    setSelectedUser({ userName, id });
  };

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };
  const userid = selectedUser?.id;
  console.log("sele", userid);

  const handleExecuteCommand = async () => {
    try {
      // Make a POST request to the API route
      const response = await fetch("/api/updateCommand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          command,
        }),
      });

      if (response.ok) {
        console.log("Command executed successfully");
      } else {
        console.error("Failed to execute command:", response.statusText);
      }
    } catch (error) {
      console.error("Error executing command:", error);
    }
    console.log("user", userid, command);
  };

  const matchingUsers = assistArray.map((assistUserName) => {
    const user = Users.find(
      (u) => u?.user?.user?.user?.name === assistUserName
    );
    console.log("matchinguser", user);

    if (user) {
      console.log("kkkkkkk", user._id);
      return (
        <>
          <div key={assistUserName} className="ml-4 w-full h-10">
            <div>
              <button
                onClick={() =>
                  handleUserButtonClick(
                    assistUserName,

                    user._id
                  )
                }
                className=""
                type="button"
              >
                <p className=""> {assistUserName}</p>
              </button>
              <></>
              {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
                  <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                      <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-semibold">Meeting</p>
                        <button
                          className="modal-close cursor-pointer z-50"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <span className="text-3xl">×</span>
                        </button>
                      </div>
                      {surveylist.map((user, index) => (
                        <div key={index}>
                          {/* {user.command} */}
                          <p>
                            Frontend Rating: {user["your rating in frontend"]}
                          </p>
                          <p>
                            Logical Thinking Rating:{" "}
                            {user["your rating in logicaal thinking"]}
                          </p>
                          <p>
                            Backend Rating: {user["your rating in backend"]}
                          </p>
                          <p>
                            Situation of Collaboration:{" "}
                            {
                              user[
                                "Describe a situation where you had to collaborate with a team to solve a problem."
                              ]
                            }
                          </p>
                          <p>
                            Handling Constructive Criticism:{" "}
                            {user["How do you handle constructive criticism?"]}
                          </p>
                        </div>
                      ))}
                      <div className="space-y-4">
                        <div className="mb-6">
                          <label
                            htmlFor="command"
                            className="text-sm block mb-2 font-semibold"
                          >
                            Command:
                          </label>
                          <input
                            type="text"
                            id="command"
                            className="border rounded w-full h-20"
                            value={command}
                            onChange={handleCommandChange}
                          />
                        </div>

                        <button
                          className="bg-blue-700 text-white px-4 py-2 mx-4 mb-5 rounded"
                          onClick={handleExecuteCommand}
                        >
                          Execute Command
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    return null;
  });

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen flex  bg-gray-100">
        <div className="bg-white px-4  w-full  ">
          <div className="flex">
            <div>
              <div className="mb-4 w-52p-4 rounded-lg shadow-md">
                {email && name && (
                  <div>
                    <div className="bg-black text-white py-6">
                      <span className="font-bold  ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                          />
                        </svg>
                      </span>
                      <span className="">{name}</span> <br />
                      <br />
                      <span className="font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3l7 7L19 3"
                          />
                        </svg>
                      </span>
                      <span className="">{email}</span> <br /> <br />
                      <span className="  text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21l-7-7M19 21l-7-7m7 7H5M6 3h14a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                          />
                        </svg>
                        <span>
                          Number of Trainees: <span>{assistArray.length}</span>
                        </span>
                        <br />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-black w-56 p-4 h-full mt-10 border-r text-white border-gray-300">
                <ul className="list-none pl-0">
                  <li className="text-base mb-9 flex items-center justify-between my-3">
                    <span>
                      Forms{" "}
                      <sup className="bg-red-500 text-white rounded-full p-1">
                        {assistArray.length}
                      </sup>
                    </span>
                  </li>
                  <li className="text-base mb-9 flex items-center">
                    <span>Employee Data 📊</span>
                  </li>
                  <li className="text-base  mb-9 flex items-center">
                    <span>Meeting ⏰</span>
                  </li>
                  <li className="text-base  mb-9 flex items-center">
                    <span>Performance Metrics 🚀</span>
                  </li>
                  <li
                    onClick={handleleaverequest}
                    className="text-base  mb-9 flex items-center cursor-pointer"
                  >
                    <span>
                      Leave Requests{" "}
                      <sup className="bg-red-500 text-white mb-3 rounded-full p-1">
                        {leaverequest.length}
                      </sup>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="container mx-auto px-4">
                <h3 className=" ml-4 font-semibold text-xl mb-10">
                  Trainee details
                </h3>
                <p className="mb-10 ml-4">
                  Your Trainees survey is listed below. Please check and give a
                  review for their review.
                </p>
                <div className="flex ">{matchingUsers}</div>
              </div>
              <div className="container mx-auto mt-10 px-4">
                <h3 className=" ml-4 font-semibold text-xl mb-10">
                  Project Details
                </h3>
                <p className="mb-10 ml-4">
                  This container consist of project details and project related
                  question.{" "}
                </p>
                {/* <div className="flex ">{matchingUsers}</div> */}
              </div>
              <div className=" mx-auto rounded   mt-10 ml-8 mr-20">
                {filteredUsers.length === 0 ? (
                  <h2 className="text-2xl font-semibold text-center w-full">
                    No Projects Found
                  </h2>
                ) : (
                  <h2 className="text-2xl font-semibold  mb-10 w-full">
                    Project Details
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                  {filteredUsers.map((project) => (
                    <div
                      key={project.id}
                      className="max-w-xs mx-auto bg-white border rounded-lg shadow overflow-hidden"
                      onClick={() => handleProjectClick(project)}
                    >
                      <a>
                        <img
                          className="w-full h-32 object-cover rounded-t-lg"
                          src={project.img}
                          alt={project.name}
                        />
                      </a>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">
                          {project.name}
                        </h2>
                        {/* <p className="text-gray-700">{project.details}</p> */}
                        <hr className="my-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projects");
    const ds = client.db("form");
    const leave = client.db("leave");
    const answers = client.db("questions");

    const product = await db.collection("details").find({}).limit(20).toArray();
    const products = await ds
      .collection("members")
      .find({})
      .limit(20)
      .toArray();
    const membersleave = await leave
      .collection("details")
      .find({})
      .limit(20)
      .toArray();
    const answersproject = await answers
      .collection("project")
      .find({})
      .limit(20)
      .toArray();

    return {
      props: {
        forms: JSON.parse(JSON.stringify(product)),
        Users: JSON.parse(JSON.stringify(products)),
        leave: JSON.parse(JSON.stringify(membersleave)),
        questions: JSON.parse(JSON.stringify(answersproject)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        Users: [],
        forms: [],
      },
    };
  }
}
export default Teamleaddashboard;
